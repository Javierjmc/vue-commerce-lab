# 🚀 Guía Completa de Deployment - Stripe + Cloud Functions

## 📋 Tabla de Contenidos

1. [Setup inicial](#setup-inicial)
2. [Configurar Stripe](#configurar-stripe)
3. [Configurar Firebase](#configurar-firebase)
4. [Desplegar Cloud Functions](#desplegar-cloud-functions)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## Setup Inicial

### 1. Clonar o actualizar el repositorio

```bash
git clone <tu-repo> vue-commerce-lab
cd vue-commerce-lab
npm install
```

### 2. Instalar Firebase CLI globalmente

```bash
npm install -g firebase-tools
```

### 3. Autenticarse con Firebase

```bash
firebase login
```

Esto abrirá una ventana del navegador para que inicies sesión con tu cuenta de Google.

---

## Configurar Stripe

### Paso 1: Crear cuenta en Stripe

1. Ve a [https://stripe.com](https://stripe.com)
2. Crea una cuenta de negocios
3. Completa la verificación

### Paso 2: Obtener claves API

#### 🟢 Modo Desarrollo (Testing)

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com)
2. Asegúrate de estar en **Test Mode** (esquina superior derecha)
3. Ve a **Developers** → **API Keys**
4. Copia:
   - **Publishable Key** (comienza con `pk_test_`)
   - **Secret Key** (comienza con `sk_test_`)

#### 🔴 Modo Producción (Live)

1. Activa **Live Mode** en Stripe Dashboard
2. Completa la verificación de negocio
3. Ve a **Developers** → **API Keys**
4. Copia:
   - **Publishable Key** (comienza con `pk_live_`)
   - **Secret Key** (comienza con `sk_live_`)

### Paso 3: Configurar Webhook (Para Producción)

1. Ve a **Developers** → **Webhooks**
2. Haz clic en **Add endpoint**
3. URL del endpoint: `https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/stripeWebhook`
4. Selecciona los eventos:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.canceled`
5. Copia el **Signing Secret** (`whsec_live_...`)

---

## Configurar Firebase

### Paso 1: Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en **Crear proyecto**
3. Nombre: `vue-commerce-lab` (o el que prefieras)
4. Selecciona ubicación
5. Haz clic en **Crear proyecto**

### Paso 2: Habilitar servicios

En Firebase Console:

1. **Firestore Database**
   - Firestore → Crear base de datos
   - Modo: **Iniciar en modo de prueba** (para desarrollo)
   - Ubicación: Elige la más cercana

2. **Authentication**
   - Authentication → Proveedor → Email/Password
   - Habilitar

3. **Cloud Functions**
   - Ya están habilitadas automáticamente

### Paso 3: Obtener configuración de Firebase

1. Proyecto → **Configuración del proyecto** (⚙️)
2. Copia tu `projectId`

### Paso 4: Crear archivo `.env.local`

En la raíz del proyecto:

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```env
# Stripe - Modo Desarrollo
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE

# Firebase (opcional si quieres cambiar la configuración)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Desplegar Cloud Functions

### Fase 1: Desarrollo Local (Emulator)

#### Instalar dependencias de functions

```bash
cd functions
npm install
cd ..
```

#### Iniciar el emulator

```bash
firebase emulators:start --only functions,firestore
```

Esto ejecutará las funciones localmente en `http://localhost:5001`

#### Testear en el frontend

La app detectará automáticamente que estás usando el emulator y ajustará los endpoints.

### Fase 2: Desplegar a Producción

#### Paso 1: Compilar las functions

```bash
cd functions
npm run build
cd ..
```

#### Paso 2: Configurar variables de entorno en Firebase

En Firebase Console → Tu Proyecto → **Functions** → **Configuración del runtime**:

**Para DESARROLLO (si usas functions en lugar de emulator):**
```
STRIPE_SECRET_KEY_DEV = sk_test_YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET_DEV = whsec_test_YOUR_WEBHOOK_SECRET
```

**Para PRODUCCIÓN:**
```
STRIPE_SECRET_KEY_PROD = sk_live_YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET_PROD = whsec_live_YOUR_WEBHOOK_SECRET
```

#### Paso 3: Desplegar las functions

```bash
firebase deploy --only functions
```

El sistema mostrará la URL del endpoint webhook:
```
✔  Deploy complete!

Function URL (stripeWebhook): https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/stripeWebhook
```

Copia esta URL y configúrala en Stripe Dashboard → Webhooks

#### Paso 4: Desplegar el frontend (opcional)

```bash
npm run build
firebase deploy --only hosting
```

---

## Testing

### 1. Testing Local (Con Emulator)

```bash
# Terminal 1: Compilar TypeScript en watch mode
cd functions
npm run build:watch

# Terminal 2: Iniciar emulator (desde raíz del proyecto)
firebase emulators:start --only functions,firestore

# Terminal 3: Iniciar la app
npm run dev
```

Ahora puedes ir a `http://localhost:5173/checkout` y probar pagos.

### 2. Tarjetas de Prueba

En modo `TEST` (desarrollo):

#### ✅ Pago exitoso
- Número: `4242 4242 4242 4242`
- Fecha: `12/34`
- CVC: `456`

#### ❌ Pago rechazado
- Número: `4000 0000 0000 0002`
- Fecha: `12/34`
- CVC: `456`

#### ⚠️ Requiere 3D Secure
- Número: `4000 2500 0003 4010`
- Fecha: `12/34`
- CVC: `456`

### 3. Verificar en Console

1. Firebase Console → **Functions** → **Logs**
   - Ver logs de las funciones

2. Firebase Console → **Firestore** → Colección `orders`
   - Ver órdenes creadas

3. Stripe Dashboard → **Payments**
   - Ver transacciones procesadas

---

## Environment Detection

El sistema automáticamente detecta el entorno:

```
├─ EMULATOR → Usa claves de desarrollo locales
├─ NODE_ENV=development → Usa STRIPE_SECRET_KEY_DEV
└─ PRODUCCIÓN → Usa STRIPE_SECRET_KEY_PROD
```

No necesitas cambiar código, solo las variables de entorno.

---

## Troubleshooting

### ❌ Error: "Stripe secret key not found"

**Solución:**
- Verificar que las variables de entorno están configuradas en Firebase Console
- Reiniciar el emulator: `Ctrl+C` y `firebase emulators:start`

### ❌ Error: "User not authenticated"

**Solución:**
- Asegúrate de haber iniciado sesión en la app
- Verifica que Authentication está habilitado en Firebase

### ❌ Webhook no se recibe

**Solución:**
- Verificar que la URL del webhook es correcta en Stripe
- Usar `ngrok` para testear webhooks localmente:
  ```bash
  ngrok http 5001
  ```
- Usar esa URL en Stripe Dashboard → Webhooks

### ❌ Error: "CORS" al llamar la función

**Solución:**
- Las Cloud Functions están configuradas como `onCall` (HTTP)
- Verificar que el navegador puede acceder a `us-central1-....cloudfunctions.net`

### ❌ Función no se despliega

**Solución:**
```bash
cd functions
npm run build  # Verificar que compila sin errores
cd ..
firebase deploy --only functions --debug  # Ver detalles
```

---

## Monitoreo en Producción

### Logs en Firebase Console

```
Firebase Console → Functions → Logs
```

### Ver logs en tiempo real

```bash
firebase functions:log
```

### Errores

```
Firebase Console → Error Reporting
```

---

## Escalado

Por defecto, Cloud Functions escala automáticamente. 

Pero puedes limitar en `firebase.json`:

```json
{
  "functions": {
    "runtime": "nodejs20",
    "maxInstances": 100,
    "memory": "256MB"
  }
}
```

---

## Costos

### Firebase Cloud Functions
- **Primeras 2M de invocaciones/mes**: GRATIS
- **Después**: $0.40 por 1M de invocaciones

### Stripe
- **Test Mode**: GRATIS
- **Live Mode**: 
  - 1.4% + €0.25 por transacción (tarjetas EU)
  - 2.9% + $0.30 por transacción (internacional)

---

## 🎉 ¡Listo!

Tu app está completamente configurada con:

✅ Pagos seguros con Stripe
✅ Cloud Functions para procesar pagos
✅ Órdenes guardadas en Firestore
✅ Webhooks para actualizar estado
✅ Soporte para dev y producción

**¿Preguntas?** Consulta la documentación:
- [Firebase Functions](https://firebase.google.com/docs/functions)
- [Stripe API](https://stripe.com/docs/api)
