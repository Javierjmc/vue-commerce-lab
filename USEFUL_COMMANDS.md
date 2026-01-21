# Comandos Útiles - Vue Commerce Lab

## 🚀 Desarrollo

### Iniciar servidor de desarrollo
```bash
npm run dev
```

### Iniciar Firebase Emulator
```bash
firebase emulators:start --only functions
```

### Construir en watch mode (Functions)
```bash
cd functions
npm run build:watch
```

### Ver logs de Cloud Functions
```bash
firebase functions:log
```

## 🔨 Compilación

### Compilar Frontend
```bash
npm run build
```

### Compilar Cloud Functions
```bash
cd functions
npm run build
```

### Compilar ambos
```bash
npm run build && cd functions && npm run build
```

## 🧪 Testing

### Probar con Stripe
1. Ir a `http://localhost:5173/checkout`
2. Seleccionar tab "Stripe"
3. Usar tarjeta: `4242 4242 4242 4242`

### Probar con PayPal
1. Ir a `http://localhost:5173/checkout`
2. Seleccionar tab "PayPal"
3. Usar Sandbox mode (cualquier email/contraseña)

## 🔑 Credenciales

### Obtener credenciales de Stripe
1. Ve a https://dashboard.stripe.com
2. Copia `pk_test_...` (Public Key)
3. Copia `sk_test_...` (Secret Key)

### Obtener credenciales de PayPal
1. Ve a https://developer.paypal.com/dashboard/
2. Ve a "Apps & Credentials"
3. Copia `Client ID` y `Secret`

## 📝 Variables de Entorno

### Locales (.env.local)
```bash
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
VITE_PAYPAL_CLIENT_ID=xxx
```

### Functions (Firebase Console)
```
STRIPE_SECRET_KEY_DEV=sk_test_xxx
STRIPE_WEBHOOK_SECRET_DEV=whsec_test_xxx
PAYPAL_CLIENT_ID_DEV=xxx
PAYPAL_CLIENT_SECRET_DEV=xxx
```

## 📦 Instalación de Dependencias

### Frontend
```bash
npm install
```

### Cloud Functions
```bash
cd functions
npm install
```

### Todo
```bash
npm install && cd functions && npm install
```

## 🔄 Git

### Ver cambios
```bash
git status
```

### Hacer commit
```bash
git add .
git commit -m "feat: descripción de cambio"
```

### Push a rama
```bash
git push origin nombre-rama
```

## 🚀 Despliegue

### Desplegar Functions
```bash
firebase deploy --only functions
```

### Desplegar Hosting
```bash
npm run build
firebase deploy --only hosting
```

### Desplegar todo
```bash
firebase deploy
```

## 🔍 Debugging

### Ver estructura del proyecto
```bash
tree src/
tree functions/src/
```

### Ver logs del emulator
```bash
firebase emulators:start --only functions --debug
```

### Verificar TypeScript
```bash
npx tsc --noEmit
```

### Limpiar caché
```bash
rm -rf dist node_modules/.vite
npm run build
```

## 📊 Base de datos

### Ver Firestore en emulator
1. Ve a http://localhost:4000
2. Selecciona tu proyecto

### Exportar datos
```bash
firebase firestore:export ./backup --token $(firebase config:get token)
```

### Importar datos
```bash
firebase firestore:import ./backup --token $(firebase config:get token)
```

## 🐛 Troubleshooting

### "Port already in use"
```bash
# Matar proceso
lsof -i :5173
kill -9 <PID>

# O usar otro puerto
npm run dev -- --port 3000
```

### "Function not found"
```bash
cd functions
npm run build
firebase deploy --only functions
```

### "CORS error"
Ver `firebase.json` y verificar configuración de CORS

### "Credenciales no funcionan"
1. Verificar en Firebase Console
2. Verificar que NO tienen espacios
3. Reiniciar emulator

## 📈 Rendimiento

### Analizar tamaño del bundle
```bash
npm run build
du -sh dist/
```

### Ver tamaño de funciones
```bash
cd functions
npm run build
du -sh lib/
```

## 💾 Backups

### Backup de Firestore
```bash
firebase firestore:export ./backups/$(date +%Y%m%d_%H%M%S)
```

### Backup completo
```bash
firebase backup
```

## 📞 Ayuda

### Ver version de Firebase CLI
```bash
firebase --version
```

### Ver documentación
```bash
firebase help
```

### Ver logs de login
```bash
firebase login:list
```

## 🔗 Links Útiles

- [Firebase Console](https://console.firebase.google.com)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [PayPal Developer](https://developer.paypal.com/dashboard/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [PayPal Docs](https://developer.paypal.com/docs/)

## 📋 Checklist Pre-Deploy

- [ ] `npm run build` sin errores
- [ ] `cd functions && npm run build` sin errores
- [ ] Probar Stripe en localhost
- [ ] Probar PayPal en localhost
- [ ] Verificar credenciales en Firebase Console
- [ ] Verificar Firestore rules
- [ ] Verificar CORS
- [ ] Revisar git log
- [ ] Hacer backup
- [ ] `firebase deploy`

## 🎯 Próximas features (Roadmap)

- [ ] Apple Pay
- [ ] Google Pay
- [ ] Reembolsos automáticos
- [ ] Reportes de ventas
- [ ] Email confirmación
- [ ] SMS notificaciones
- [ ] Analytics
- [ ] Webhooks customizados

---

*Última actualización: 2025-01-21*
