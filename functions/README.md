# Firebase Cloud Functions - Vue Commerce Lab

Funciones serverless para procesar pagos con Stripe de forma segura.

## 📋 Funciones disponibles

### 1. `createPaymentIntent` (Callable)
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

### 2. `confirmPayment` (Callable)
Confirma el estado de un pago.

### 3. `getUserOrders` (Callable)
Obtiene todas las órdenes del usuario autenticado.

### 4. `stripeWebhook` (HTTP)
Endpoint para recibir webhooks de Stripe.

## 🔄 Flujo del ambiente

```
DESARROLLO (Emulator)
├─ sk_test_... (Secret Key de Stripe)
└─ whsec_test_... (Webhook Secret)

PRODUCCIÓN (Cloud Functions)
├─ sk_live_... (Secret Key de Stripe)
└─ whsec_live_... (Webhook Secret)
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

**Producción:**
```
STRIPE_SECRET_KEY_PROD = sk_live_...
STRIPE_WEBHOOK_SECRET_PROD = whsec_live_...
```

**Desarrollo (si no usas emulator):**
```
STRIPE_SECRET_KEY_DEV = sk_test_...
STRIPE_WEBHOOK_SECRET_DEV = whsec_test_...
```

## 📊 Estructura de datos en Firestore

### Colección: `orders`

```
{
  id: string (document ID),
  userId: string,
  paymentIntentId: string,
  amount: number,
  currency: "eur",
  status: "succeeded" | "failed" | "canceled" | "processing",
  customerEmail: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  environment: "development" | "production",
  paidAt?: timestamp,
  failureReason?: string
}
```

### Colección: `payment_errors` (para debugging)

```
{
  userId: string,
  error: string,
  code: string,
  createdAt: timestamp,
  environment: "development" | "production"
}
```

## 🔐 Seguridad

✅ **Autenticación requerida** - Solo usuarios autenticados pueden llamar
✅ **Validación de datos** - Todos los parámetros se validan
✅ **Manejo de errores** - Los errores sensitivos no se exponen al cliente
✅ **Logs de auditoría** - Todas las transacciones se registran en Firestore
✅ **Webhooks verificados** - Stripe verifica la firma del webhook

## 🧪 Testing con Stripe

Usa tarjetas de prueba en modo desarrollo:

- ✅ Pago exitoso: `4242 4242 4242 4242`
- ❌ Pago rechazado: `4000 0000 0000 0002`
- ⚠️ Autenticación requerida: `4000 2500 0003 4010`

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
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
