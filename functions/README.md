# Firebase Cloud Functions - Vue Commerce Lab

Funciones serverless para procesar pagos seguros con **Stripe** y **PayPal**.

## 📋 Funciones disponibles

### Stripe

#### 1. `createPaymentIntent` (Callable)
Crea un PaymentIntent en Stripe y guarda la orden en Firestore.

**Parámetros:**
```typescript
{
  paymentMethodId: string;  // ID del método de pago
  amount: number;           // Monto en EUR
  orderId: string;          // ID único de la orden
  customerEmail: string;    // Email del cliente
  description: string;      // Descripción del pago
}
```

**Respuesta:**
```typescript
{
  success: boolean;
  paymentIntentId: string;
  clientSecret: string;
  status: string;
}
```

#### 2. `confirmPayment` (Callable)
Confirma el estado de un pago en Stripe.

#### 3. `getUserOrders` (Callable)
Obtiene todas las órdenes del usuario autenticado.

#### 4. `stripeWebhook` (HTTP)
Endpoint para recibir webhooks de Stripe.

### PayPal

#### 1. `createPayPalOrder` (Callable)
Crea una orden de pago en PayPal.

**Parámetros:**
```typescript
{
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}
```

**Respuesta:**
```typescript
{
  orderId: string;
  paymentId: string;
  approvalUrl: string;
}
```

#### 2. `capturePayPal` (Callable)
Captura/ejecuta un pago aprobado en PayPal.

**Parámetros:**
```typescript
{
  orderId: string;
  paymentId: string;
  payerId: string;
}
```

**Respuesta:**
```typescript
{
  orderId: string;
  transactionId: string;
  status: "completed" | "failed";
}
```

#### 3. `getUserPayPalOrders` (Callable)
Obtiene todas las órdenes de PayPal del usuario autenticado.

## 🔄 Flujo del ambiente

```
DESARROLLO (Emulator)
├─ Stripe: sk_test_...
├─ Stripe Webhook: whsec_test_...
├─ PayPal: Sandbox credentials
└─ PayPal mode: "sandbox"

PRODUCCIÓN (Cloud Functions)
├─ Stripe: sk_live_...
├─ Stripe Webhook: whsec_live_...
├─ PayPal: Live credentials
└─ PayPal mode: "live"
```

Las funciones automáticamente detectan el entorno y usan las claves correctas.

## 🚀 Instalación y Setup

### 1. Instalar dependencias

```bash
cd functions
npm install
```

### 2. Compilar TypeScript

```bash
npm run build
```

### 3. Testing local con emulator

```bash
# Terminal 1: Compilar en watch mode
npm run build:watch

# Terminal 2: Iniciar emulator
firebase emulators:start --only functions
```

### 4. Desplegar a producción

```bash
firebase deploy --only functions
```

## 🔑 Variables de entorno

Añade en Firebase Console → Configuración del runtime:

**Stripe - Producción:**
```
STRIPE_SECRET_KEY_PROD=sk_live_...
STRIPE_WEBHOOK_SECRET_PROD=whsec_live_...
```

**Stripe - Desarrollo (si no usas emulator):**
```
STRIPE_SECRET_KEY_DEV=sk_test_...
STRIPE_WEBHOOK_SECRET_DEV=whsec_test_...
```

**PayPal - Producción:**
```
PAYPAL_CLIENT_ID_PROD=...
PAYPAL_CLIENT_SECRET_PROD=...
```

**PayPal - Desarrollo (Sandbox):**
```
PAYPAL_CLIENT_ID_DEV=...
PAYPAL_CLIENT_SECRET_DEV=...
```

**URLs de retorno:**
```
RETURN_URL=https://tudominio.com/checkout
CANCEL_URL=https://tudominio.com/checkout
```

Ver `.env.example` para más detalles.

## 📊 Estructura de datos en Firestore

### Colección: `orders` (Stripe)

```json
{
  "id": "string (document ID)",
  "userId": "string",
  "paymentIntentId": "string",
  "amount": "number",
  "currency": "eur",
  "status": "succeeded | failed | canceled | processing",
  "customerEmail": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "environment": "development | production",
  "paidAt": "timestamp (opcional)",
  "failureReason": "string (opcional)"
}
```

### Colección: `paypal_orders` (PayPal)

```json
{
  "id": "uuid",
  "userId": "string",
  "paypalPaymentId": "string",
  "status": "created | completed",
  "items": [{ "id", "name", "quantity", "price" }],
  "total": "number",
  "currency": "eur",
  "paypalTransactionId": "string (después de captura)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Colección: `payment_errors` (para debugging)

```json
{
  "id": "auto-generated",
  "type": "stripe_error | paypal_error",
  "userId": "string",
  "error": "string",
  "code": "string (opcional)",
  "createdAt": "timestamp",
  "environment": "development | production"
}
```

## 🔐 Seguridad

✅ **Autenticación requerida** - Solo usuarios autenticados pueden llamar
✅ **Validación de datos** - Todos los parámetros se validan
✅ **Manejo de errores** - Los errores sensitivos no se exponen al cliente
✅ **Logs de auditoría** - Todas las transacciones se registran en Firestore
✅ **Webhooks verificados** - Stripe verifica la firma del webhook

## 🧪 Testing con tarjetas

### Stripe

Usa estas tarjetas en modo desarrollo:

- ✅ Pago exitoso: `4242 4242 4242 4242`
- ❌ Pago rechazado: `4000 0000 0000 0002`
- ⚠️ Autenticación requerida: `4000 2500 0003 4010`

### PayPal

En Sandbox puedes usar cualquier email/contraseña. Ver [PAYPAL_SETUP.md](../PAYPAL_SETUP.md) para tarjetas de prueba.

## 📈 Monitoramiento

En Firebase Console:
- **Logs**: Console → Functions → Logs
- **Métricas**: Console → Functions → Monitoring
- **Errores**: Console → Functions → Error Reporting

## 🆘 Troubleshooting

**Error: "Stripe secret key not found"**
- Verificar que las variables de entorno están configuradas en Firebase
- Verificar que estás en el entorno correcto (dev/prod)

**Error: "UNAUTHENTICATED"**
- El usuario no está autenticado en Firebase
- Verificar que el usuario ha iniciado sesión

**Webhook no se recibe**
- Verificar que el endpoint está expuesto (HTTPS)
- Configurar la URL del webhook en Stripe Dashboard
- Verificar la firma del webhook

## 📚 Referencias

- [Firebase Functions Documentation](https://firebase.google.com/docs/functions)
- [Stripe API Reference](https://stripe.com/docs/api)
- [PayPal REST API](https://developer.paypal.com/docs/api/)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [STRIPE_SETUP.md](../STRIPE_SETUP.md) - Guía completa de Stripe
- [PAYPAL_SETUP.md](../PAYPAL_SETUP.md) - Guía completa de PayPal
