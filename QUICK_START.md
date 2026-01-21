# ⚡ Quick Start - Stripe + Cloud Functions

## 🚀 Para empezar AHORA (5 minutos)

### 1. Setup Stripe (gratuito)

```bash
# Ir a https://stripe.com
# Crear cuenta gratis
# Ir a Dashboard → Developers → API Keys (TEST MODE)
# Copiar pk_test_...
```

### 2. Configurar entorno

```bash
# Crear .env.local si no existe
cp .env.example .env.local

# Editar con tu clave de Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
```

### 3. Instalar Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 4. Instalar dependencias de functions

```bash
cd functions
npm install
npm run build
cd ..
```

### 5. Iniciar emulator local

**Terminal 1:**
```bash
firebase emulators:start --only functions,firestore
```

**Terminal 2:**
```bash
npm run dev
```

### 6. Probar en la app

1. Ve a `http://localhost:5173/checkout`
2. Usa tarjeta de prueba: `4242 4242 4242 4242`
3. Fecha: `12/34` | CVC: `456`
4. ¡Haz clic en "Pagar"!

---

## 🟢 Tarjetas de Prueba (en DEVELOPMENT)

| Caso | Número | Resultado |
|------|--------|-----------|
| Exitoso | 4242 4242 4242 4242 | ✅ Pago aprobado |
| Rechazado | 4000 0000 0000 0002 | ❌ Pago rechazado |
| 3D Secure | 4000 2500 0003 4010 | ⚠️ Requiere verificación |

---

## 📊 Ver lo que sucede

### Logs de functions
```bash
firebase functions:log
```

### Firestore (órdenes guardadas)
Firebase Console → Firestore → Colección `orders`

### Stripe Dashboard
Dashboard → Payments → Mostrar transacciones de prueba

---

## 🚢 Desplegar a Producción

```bash
# 1. Cambiar a claves LIVE de Stripe
# Dashboard → Live Mode → Copiar sk_live_...

# 2. Configurar en Firebase Console
# Functions → Runtime → Variables de entorno
# STRIPE_SECRET_KEY_PROD = sk_live_...

# 3. Desplegar
firebase deploy --only functions
npm run build && firebase deploy --only hosting
```

---

## 📚 Archivos importantes

- `src/components/PaymentForm.tsx` - Formulario de pago seguro
- `src/context/StripeProvider.tsx` - Proveedor de Stripe
- `functions/src/index.ts` - Cloud Functions (procesa pagos)
- `DEPLOYMENT_GUIDE.md` - Guía detallada completa
- `STRIPE_SETUP.md` - Info sobre Stripe

---

## ❓ Problemas rápidos

| Error | Solución |
|-------|----------|
| "Stripe key not found" | Verificar `.env.local` y reiniciar |
| "User not authenticated" | Iniciar sesión en la app primero |
| Pago no procesa | Verificar logs: `firebase functions:log` |
| Emulator no abre | Puerto 5001 en uso: `lsof -i :5001` |

---

## 🎯 Próximos pasos

1. ✅ Testing en desarrollo (ahora)
2. ⬜ Cambiar a claves LIVE
3. ⬜ Desplegar a Firebase Hosting
4. ⬜ Configurar dominio personalizado
5. ⬜ Monitorear en producción

¡Eso es todo! 🎉

**¿Dudas?** Lee `DEPLOYMENT_GUIDE.md` para la guía completa.
