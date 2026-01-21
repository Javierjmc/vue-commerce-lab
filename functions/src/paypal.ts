import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { paypal, PAYPAL_CONFIG } from "./config/paypal";
import { v4 as uuid } from "uuid";

const db = admin.firestore();

/**
 * Crea una orden en PayPal
 * POST: /createPayPalOrder
 */
export const createPayPalOrder = functions.https.onCall(
  async (data: unknown, context: functions.https.CallableContext) => {
    try {
      // Validar autenticación
      if (!context.auth) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "El usuario debe estar autenticado"
        );
      }

      const payload = data as {
        items: Array<{ id: string; name: string; quantity: number; price: number }>;
        total: number;
      };

      // Validar datos
      if (!payload.items || payload.items.length === 0) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Los items son requeridos"
        );
      }

      // Generar ID único para la orden
      const orderId = uuid();

      // Crear descripción de items
      const itemList = {
        items: payload.items.map((item) => ({
          name: item.name,
          sku: item.id,
          price: item.price.toFixed(2),
          currency: PAYPAL_CONFIG.currency,
          quantity: item.quantity,
        })),
        shipping_address: {
          recipient_name: "Recipient",
          type: "residential",
          line1: "Street",
          city: "City",
          state: "State",
          postal_code: "00000",
          country_code: "ES",
        },
      };

      // Crear payment object
      const payment = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: `${process.env.RETURN_URL || "http://localhost:5173"}/checkout?status=success&orderId=${orderId}`,
          cancel_url: `${process.env.CANCEL_URL || "http://localhost:5173"}/checkout?status=cancel`,
        },
        transactions: [
          {
            amount: {
              total: payload.total.toFixed(2),
              currency: PAYPAL_CONFIG.currency,
              details: {
                subtotal: payload.total.toFixed(2),
                tax: "0.00",
                shipping: "0.00",
              },
            },
            description: `Orden ${orderId}`,
            invoice_number: orderId,
            item_list: itemList,
          },
        ],
      };

      // Crear la orden en PayPal
      return new Promise((resolve, reject) => {
        paypal.payment.create(payment, (err: any, payment: any) => {
          if (err) {
            console.error("❌ Error creating PayPal payment:", err);
            reject(
              new functions.https.HttpsError("internal", `PayPal error: ${err.message || JSON.stringify(err)}`)
            );
          } else {
            // Obtener URL de aprobación
            const approvalUrl = payment.links.find(
              (link: any) => link.rel === "approval_url"
            )?.href;

            if (!approvalUrl) {
              reject(
                new functions.https.HttpsError(
                  "internal",
                  "No approval URL found in PayPal response"
                )
              );
              return;
            }

            // Guardar orden en Firestore
            db.collection("paypal_orders").doc(orderId).set({
              userId: context.auth!.uid,
              paypalPaymentId: payment.id,
              status: "created",
              items: payload.items,
              total: payload.total,
              currency: PAYPAL_CONFIG.currency,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            resolve({
              orderId,
              paymentId: payment.id,
              approvalUrl,
            });
          }
        });
      });
    } catch (error) {
      console.error("❌ createPayPalOrder error:", error);
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      throw new functions.https.HttpsError("internal", message);
    }
  }
);

/**
 * Captura (ejecuta) una orden de PayPal
 * POST: /capturePayPal
 */
export const capturePayPal = functions.https.onCall(
  async (data: unknown, context: functions.https.CallableContext) => {
    try {
      // Validar autenticación
      if (!context.auth) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "El usuario debe estar autenticado"
        );
      }

      const payload = data as {
        orderId: string;
        paymentId: string;
        payerId: string;
      };

      if (!payload.orderId || !payload.paymentId || !payload.payerId) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "orderId, paymentId y payerId son requeridos"
        );
      }

      // Ejecutar el pago en PayPal
      return new Promise((resolve, reject) => {
        const executePaymentDetails = { payer_id: payload.payerId };

        paypal.payment.execute(
          payload.paymentId,
          executePaymentDetails,
          async (err: any, payment: any) => {
            if (err) {
              console.error("❌ Error executing PayPal payment:", err);

              // Registrar error en Firestore
              await db.collection("payment_errors").add({
                type: "paypal_execute_error",
                orderId: payload.orderId,
                paymentId: payload.paymentId,
                error: err.message || JSON.stringify(err),
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
              });

              reject(
                new functions.https.HttpsError("internal", `PayPal error: ${err.message || JSON.stringify(err)}`)
              );
            } else {
              // Verificar que el pago fue completado
              if (payment.state !== "approved") {
                reject(
                  new functions.https.HttpsError(
                    "failed-precondition",
                    `Payment state is ${payment.state}, not approved`
                  )
                );
                return;
              }

              // Actualizar orden en Firestore
              const transactionId = payment.transactions[0]?.related_resources[0]?.sale?.id;

              await db.collection("paypal_orders").doc(payload.orderId).update({
                status: "completed",
                paypalTransactionId: transactionId,
                approvalDetails: payment,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
              });

              // Registrar en orders collection para mantener consistencia
              await db.collection("orders").add({
                userId: context.auth!.uid,
                orderId: payload.orderId,
                paymentMethod: "paypal",
                transactionId,
                status: "completed",
                items: [], // Obtenido de paypal_orders si es necesario
                total: 0,
                currency: PAYPAL_CONFIG.currency,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
              });

              resolve({
                orderId: payload.orderId,
                transactionId,
                status: "completed",
                payment,
              });
            }
          }
        );
      });
    } catch (error) {
      console.error("❌ capturePayPal error:", error);
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      throw new functions.https.HttpsError("internal", message);
    }
  }
);

/**
 * Obtiene las órdenes de PayPal del usuario
 * GET: /getUserPayPalOrders
 */
export const getUserPayPalOrders = functions.https.onCall(
  async (data: unknown, context: functions.https.CallableContext) => {
    try {
      // Validar autenticación
      if (!context.auth) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "El usuario debe estar autenticado"
        );
      }

      // Obtener órdenes del usuario
      const snapshot = await db
        .collection("paypal_orders")
        .where("userId", "==", context.auth.uid)
        .orderBy("createdAt", "desc")
        .get();

      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { orders };
    } catch (error) {
      console.error("❌ getUserPayPalOrders error:", error);
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      throw new functions.https.HttpsError("internal", message);
    }
  }
);
