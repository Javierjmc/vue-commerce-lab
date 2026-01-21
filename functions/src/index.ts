import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { stripe, STRIPE_CONFIG } from "./config/stripe";

// Inicializar Firebase Admin
admin.initializeApp();

const db = admin.firestore();

/**
 * Crear un PaymentIntent para procesar un pago
 * 
 * Request body:
 * {
 *   paymentMethodId: string,
 *   amount: number (en euros),
 *   orderId: string,
 *   customerEmail: string,
 *   description: string
 * }
 */
export const createPaymentIntent = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    // Verificar autenticación
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Usuario no autenticado"
      );
    }

    const { paymentMethodId, amount, orderId, customerEmail, description } =
      data;

    // Validaciones
    if (!paymentMethodId || !amount || !orderId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Faltan parámetros requeridos: paymentMethodId, amount, orderId"
      );
    }

    if (amount <= 0) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "El monto debe ser mayor a 0"
      );
    }

    try {
      // Crear PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convertir a centavos
        currency: STRIPE_CONFIG.currency,
        payment_method: paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
        description: description || `Orden ${orderId}`,
        receipt_email: customerEmail,
        metadata: {
          orderId,
          userId: context.auth.uid,
          environment: STRIPE_CONFIG.isDevelopment ? "development" : "production",
        },
      });

      // Guardar orden en Firestore
      await db.collection("orders").doc(orderId).set(
        {
          userId: context.auth.uid,
          paymentIntentId: paymentIntent.id,
          amount,
          currency: STRIPE_CONFIG.currency,
          status: paymentIntent.status,
          customerEmail,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          environment: STRIPE_CONFIG.isDevelopment ? "development" : "production",
        },
        { merge: true }
      );

      console.log(
        `✅ Payment Intent created: ${paymentIntent.id} for order ${orderId}`
      );

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        status: paymentIntent.status,
      };
    } catch (error: any) {
      console.error("Error creating payment intent:", error);

      // Guardar error en Firestore para debugging
      await db.collection("payment_errors").doc(orderId).set({
        userId: context.auth.uid,
        error: error.message,
        code: error.code,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        environment: STRIPE_CONFIG.isDevelopment ? "development" : "production",
      });

      throw new functions.https.HttpsError(
        "internal",
        `Error al procesar el pago: ${error.message}`
      );
    }
  }
);

/**
 * Confirmar un pago (usado si necesitas confirmación adicional)
 */
export const confirmPayment = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Usuario no autenticado"
      );
    }

    const { paymentIntentId, orderId } = data;

    if (!paymentIntentId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "paymentIntentId es requerido"
      );
    }

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      // Actualizar orden con el estado actual
      await db.collection("orders").doc(orderId).update({
        status: paymentIntent.status,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return {
        success: true,
        status: paymentIntent.status,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error: any) {
      console.error("Error confirming payment:", error);
      throw new functions.https.HttpsError(
        "internal",
        `Error al confirmar pago: ${error.message}`
      );
    }
  }
);

/**
 * Obtener órdenes del usuario
 */
export const getUserOrders = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Usuario no autenticado"
      );
    }

    try {
      const ordersSnapshot = await db
        .collection("orders")
        .where("userId", "==", context.auth.uid)
        .orderBy("createdAt", "desc")
        .limit(50)
        .get();

      const orders = ordersSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        success: true,
        orders,
      };
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      throw new functions.https.HttpsError(
        "internal",
        `Error al obtener órdenes: ${error.message}`
      );
    }
  }
);

/**
 * Webhook para eventos de Stripe (para producción)
 */
export const stripeWebhook = functions.https.onRequest(async (req: any, res: any) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const sig = req.headers["stripe-signature"] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      STRIPE_CONFIG.webhookSecret
    );

    console.log(`📨 Webhook received: ${event.type}`);

    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object);
        break;

      case "payment_intent.canceled":
        await handlePaymentCanceled(event.data.object);
        break;

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

/**
 * Manejar pago exitoso
 */
async function handlePaymentSucceeded(paymentIntent: any) {
  const orderId = paymentIntent.metadata?.orderId;
  const userId = paymentIntent.metadata?.userId;

  if (!orderId) {
    console.warn("No orderId found in payment intent metadata");
    return;
  }

  try {
    await db.collection("orders").doc(orderId).update({
      status: "succeeded",
      paidAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`✅ Order ${orderId} marked as paid`);

    // Aquí podrías enviar email de confirmación, etc.
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error);
  }
}

/**
 * Manejar pago fallido
 */
async function handlePaymentFailed(paymentIntent: any) {
  const orderId = paymentIntent.metadata?.orderId;

  if (!orderId) {
    console.warn("No orderId found in payment intent metadata");
    return;
  }

  try {
    await db.collection("orders").doc(orderId).update({
      status: "failed",
      failureReason: paymentIntent.last_payment_error?.message,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`❌ Order ${orderId} payment failed`);
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error);
  }
}

/**
 * Manejar pago cancelado
 */
async function handlePaymentCanceled(paymentIntent: any) {
  const orderId = paymentIntent.metadata?.orderId;

  if (!orderId) {
    console.warn("No orderId found in payment intent metadata");
    return;
  }

  try {
    await db.collection("orders").doc(orderId).update({
      status: "canceled",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`⛔ Order ${orderId} payment canceled`);
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error);
  }
}
