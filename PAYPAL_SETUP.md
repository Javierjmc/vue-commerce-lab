# PayPal Setup Guide

Esta guía te ayudará a configurar PayPal para procesar pagos en Vue Commerce Lab.

## 1. Obtener Credenciales de PayPal

### Crear cuenta de PayPal Business

1. Ve a https://www.paypal.com/es/
2. Haz clic en "Registrarse"
3. Elige "Cuenta empresarial"
4. Completa los datos de tu negocio

### Obtener Client ID y Secret

1. Ve al **PayPal Developer Dashboard**: https://developer.paypal.com/dashboard/
2. Asegúrate de estar en el **Sandbox** para desarrollo
3. Ve a **Apps & Credentials**
4. Verás dos secciones:
   - **Sandbox** (para pruebas)
   - **Live** (para producción)

**Para Sandbox (Desarrollo):**
- Client ID: `PAYPAL_CLIENT_ID_DEV`
- Secret: `PAYPAL_CLIENT_SECRET_DEV`

**Para Live (Producción):**
- Client ID: `PAYPAL_CLIENT_ID_PROD`
- Secret: `PAYPAL_CLIENT_SECRET_PROD`

## 2. Configurar Variables de Entorno

### En functions/.env.local (desarrollo)

```bash
# PayPal Sandbox
PAYPAL_CLIENT_ID_DEV=YOUR_SANDBOX_CLIENT_ID
PAYPAL_CLIENT_SECRET_DEV=YOUR_SANDBOX_CLIENT_SECRET

# URLs de retorno
RETURN_URL=http://localhost:5173/checkout
CANCEL_URL=http://localhost:5173/checkout
```

### En Firebase Console (producción)

1. Ve a **Firebase Console** → Tu Proyecto → **Functions** → **Runtime environment**
2. Agrega las variables:

```
PAYPAL_CLIENT_ID_PROD=YOUR_LIVE_CLIENT_ID
PAYPAL_CLIENT_SECRET_PROD=YOUR_LIVE_CLIENT_SECRET
RETURN_URL=https://tudominio.com/checkout
CANCEL_URL=https://tudominio.com/checkout
```

## 3. Auto-Toggle entre Desarrollo y Producción

Las Cloud Functions detectan automáticamente el entorno:

```typescript
// En functions/src/config/paypal.ts
const isDevelopment = process.env.FUNCTIONS_EMULATOR === "true" || 
                      process.env.NODE_ENV === "development";

paypal.configure({
  mode: isDevelopment ? "sandbox" : "live",
  client_id: isDevelopment ? clientId_DEV : clientId_PROD,
  client_secret: isDevelopment ? clientSecret_DEV : clientSecret_PROD,
});
```

**Automático:**
- ✅ En Firebase Emulator → Usa Sandbox automáticamente
- ✅ En Cloud Functions producción → Usa Live automáticamente
- ✅ En desarrollo local → Usa Sandbox automáticamente

## 4. Credenciales de Prueba (Sandbox)

### Cuenta de vendedor (business)
- Email: `business@business.com`
- Contraseña: Puedes usar cualquiera en sandbox

### Cuenta de comprador
- Email: `buyer@business.com`
- Contraseña: Puedes usar cualquiera en sandbox

### Números de tarjeta para prueba

**Tarjeta Visa válida:**
```
Número: 4532015112830366
Vencimiento: 12/26
CVV: 123
```

**Tarjeta Mastercard válida:**
```
Número: 5425233010103442
Vencimiento: 12/26
CVV: 222
```

Puedes ver más tarjetas de prueba en:
https://developer.paypal.com/docs/platforms/checkout/testing/

## 5. Cloud Functions Disponibles

### createPayPalOrder

Crea una orden de pago en PayPal.

```typescript
const result = await httpsCallable(functions, 'createPayPalOrder')({
  items: [
    { id: '1', name: 'Producto 1', quantity: 1, price: 29.99 }
  ],
  total: 29.99
});

// Resultado:
// {
//   orderId: "uuid",
//   paymentId: "PAYID-xxx",
//   approvalUrl: "https://sandbox.paypal.com/..."
// }
```

### capturePayPal

Ejecuta/captura un pago aprobado en PayPal.

```typescript
const result = await httpsCallable(functions, 'capturePayPal')({
  orderId: "uuid",
  paymentId: "PAYID-xxx",
  payerId: "XXXXXXXXX"
});

// Resultado:
// {
//   orderId: "uuid",
//   transactionId: "xxx",
//   status: "completed"
// }
```

### getUserPayPalOrders

Obtiene todas las órdenes de PayPal del usuario autenticado.

```typescript
const result = await httpsCallable(functions, 'getUserPayPalOrders')({});

// Resultado:
// {
//   orders: [
//     { id, userId, paypalPaymentId, status, total, ... }
//   ]
// }
```

## 6. Testing Local con Emulator

### 1. Instalar dependencias

```bash
cd functions
npm install
npm run build
```

### 2. Iniciar Emulator

```bash
# Desde la raíz del proyecto
firebase emulators:start --only functions
```

### 3. Probar en el frontend

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const createPayPalOrder = httpsCallable(functions, 'createPayPalOrder');

try {
  const result = await createPayPalOrder({
    items: [{ id: '1', name: 'Test', quantity: 1, price: 10 }],
    total: 10
  });
  console.log('Order created:', result.data);
} catch (error) {
  console.error('Error:', error);
}
```

## 7. Flujo Completo de Pago con PayPal

### Cliente (Frontend)

```typescript
// 1. Crear orden en PayPal
const orderData = await createPayPalOrder({
  items: cartItems,
  total: cartTotal
});

// 2. Redirigir a PayPal para aprobación
window.location.href = orderData.approvalUrl;

// 3. PayPal redirige de vuelta con payerId
// URL: /checkout?status=success&orderId=xxx&PayerID=xxx

// 4. Capturar el pago
const captureData = await capturePayPal({
  orderId: orderData.orderId,
  paymentId: orderData.paymentId,
  payerId: params.get('PayerID')
});

// 5. Si status === 'completed' → Pago exitoso
console.log('Payment completed:', captureData.transactionId);
```

### Servidor (Cloud Functions)

```
1. createPayPalOrder recibe items
   ↓
2. Crea payment en PayPal API
   ↓
3. Guarda orden en Firestore
   ↓
4. Devuelve approvalUrl
   ↓
5. Usuario aprueba en PayPal
   ↓
6. capturePayPal recibe payerId
   ↓
7. Ejecuta el pago en PayPal
   ↓
8. Actualiza estado en Firestore
   ↓
9. Registra en orders collection
```

## 8. Colecciones en Firestore

### paypal_orders

```json
{
  "userId": "uid",
  "paypalPaymentId": "PAYID-xxx",
  "status": "completed|created",
  "items": [{ "id", "name", "quantity", "price" }],
  "total": 29.99,
  "currency": "EUR",
  "paypalTransactionId": "xxx",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### orders

```json
{
  "userId": "uid",
  "orderId": "uuid",
  "paymentMethod": "paypal|stripe",
  "transactionId": "xxx",
  "status": "completed",
  "items": [],
  "total": 29.99,
  "currency": "EUR",
  "createdAt": "timestamp"
}
```

## 9. Debugging

### Ver logs de Cloud Functions

```bash
firebase functions:log
```

### Habilitar debug en frontend

```typescript
// En checkout.tsx
console.log('PayPal Order:', orderData);
console.log('Capture Result:', captureData);
```

### Revisar errores en Firestore

Colección: `payment_errors`

```json
{
  "type": "paypal_execute_error",
  "orderId": "xxx",
  "error": "Error message",
  "timestamp": "timestamp"
}
```

## 10. Pasar de Sandbox a Live

### 1. Cambiar credenciales en Firebase Console

Solo reemplaza `PAYPAL_CLIENT_ID_DEV` y `PAYPAL_CLIENT_SECRET_DEV` con los valores Live:

```
PAYPAL_CLIENT_ID_PROD=sk_live_xxx
PAYPAL_CLIENT_SECRET_PROD=secret_live_xxx
```

### 2. Las Cloud Functions se intercambiarán automáticamente

El código detecta automáticamente que está en producción y usará los Live credentials.

### 3. Actualizar URLs en Firebase Console

```
RETURN_URL=https://tudominio.com/checkout
CANCEL_URL=https://tudominio.com/checkout
```

## 11. Recursos Útiles

- **PayPal Developer Dashboard**: https://developer.paypal.com/dashboard/
- **PayPal REST API Docs**: https://developer.paypal.com/docs/api/
- **Sandbox Testing**: https://developer.paypal.com/docs/platforms/checkout/testing/
- **Troubleshooting**: https://developer.paypal.com/docs/issues/

## 12. Soporte

Si tienes problemas:

1. Revisa los logs de Cloud Functions
2. Verifica que las credenciales estén en Firebase Console
3. Asegúrate de que estés en el ambiente correcto (Sandbox vs Live)
4. Revisa la colección `payment_errors` en Firestore
