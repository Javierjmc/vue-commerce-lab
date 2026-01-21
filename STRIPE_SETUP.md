# 🎯 Integración Stripe - Guía de Setup

## 1️⃣ Crear una cuenta en Stripe

1. Ve a [https://stripe.com](https://stripe.com)
2. Crea una cuenta de negocios
3. Ve a tu [Dashboard de Stripe](https://dashboard.stripe.com)
4. Navega a **Developers** → **API Keys**
5. Copia tu **Publishable Key** (comienza con `pk_test_` en modo de prueba)

## 2️⃣ Configurar variables de entorno

1. Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.example .env.local
```

2. Edita `.env.local` y añade tu Stripe Publishable Key:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
```

3. Reinicia el servidor:

```bash
npm run dev
```

## 3️⃣ Testear con tarjetas de prueba

Usa estas tarjetas para probar en **modo de prueba**:

### ✅ Pagos exitosos:
- **Número**: 4242 4242 4242 4242
- **Fecha**: 12/34
- **CVC**: 456
- **Código postal**: 12345

### ❌ Pagos rechazados:
- **Número**: 4000 0000 0000 0002
- **Fecha**: 12/34
- **CVC**: 456

## 4️⃣ Flujo actual de pago

La integración actual está optimizada para **cliente-side**:

```
Usuario → Checkout → Stripe Elements → Confirmación
```

### ¿Qué hace cada componente?

- **`StripeProvider`**: Carga Stripe y lo hace disponible en la app
- **`PaymentForm`**: Formulario seguro con CardElement
- **`Checkout`**: Recolecta datos del cliente y procesa pagos

## 5️⃣ ⚠️ IMPORTANTE: Para Producción

Cuando estés listo para producción, necesitarás:

### A. Crear un Backend (Node.js/Firebase Cloud Function)

```javascript
// Ejemplo: Cloud Function para procesar pagos
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  // Verificar autenticación
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated');
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // Stripe usa centavos
      currency: 'eur',
      payment_method: data.paymentMethodId,
      confirm: true,
      metadata: {
        orderId: data.orderId,
        userId: context.auth.uid
      }
    });

    return { success: true, paymentIntentId: paymentIntent.id };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
```

### B. Cambiar claves a Producción

En Stripe Dashboard → Developers → API Keys:
- **Cambiar** de `Test Mode` a `Live Mode`
- Usar `pk_live_` (Publishable Key) y `sk_live_` (Secret Key)

### C. Configurar HTTPS

Stripe requiere HTTPS en producción. Tu dominio debe tener SSL.

### D. Cumplimiento normativo

- ✅ Política de privacidad
- ✅ Términos de servicio
- ✅ PCI DSS Compliance (Stripe se encarga de esto)

## 6️⃣ Próximos pasos opcionales

- [ ] Crear Cloud Function para procesar pagos en servidor
- [ ] Guardar ordenes en Firestore después de pago exitoso
- [ ] Implementar webhooks para actualizar estado de órdenes
- [ ] Agregar método de reembolso
- [ ] Implementar Apple Pay / Google Pay
- [ ] Añadir soporte para múltiples monedas

## 7️⃣ Documentación útil

- [Documentación de Stripe](https://stripe.com/docs)
- [React Stripe Library](https://github.com/stripe/react-stripe-js)
- [Stripe Testing](https://stripe.com/docs/testing)

## ❓ ¿Problemas?

Si tienes errores:

1. **Clave no cargada**: Verifica que `.env.local` existe y tiene `VITE_STRIPE_PUBLIC_KEY`
2. **Tarjeta rechazada**: En modo test, usa las tarjetas de prueba proporcionadas
3. **Error CORS**: Configura CORS en tu backend si usas Cloud Functions
4. **Validación de CVV**: Asegúrate de usar tarjetas de prueba válidas

---

**Status actual**: 🟢 Ready for Testing

Tu app está lista para procesar pagos de prueba. Una vez confides, activa modo producción.
