import * as paypal from "paypal-rest-sdk";

// Determinar entorno
const isDevelopment = process.env.FUNCTIONS_EMULATOR === "true" || 
                      process.env.NODE_ENV === "development";

// Obtener credenciales según el entorno
const clientId = isDevelopment
  ? process.env.PAYPAL_CLIENT_ID_DEV
  : process.env.PAYPAL_CLIENT_ID_PROD;

const clientSecret = isDevelopment
  ? process.env.PAYPAL_CLIENT_SECRET_DEV
  : process.env.PAYPAL_CLIENT_SECRET_PROD;

if (!clientId || !clientSecret) {
  throw new Error(
    `PayPal credentials not found for ${isDevelopment ? "development" : "production"} environment`
  );
}

// Configurar PayPal
paypal.configure({
  mode: isDevelopment ? "sandbox" : "live",
  client_id: clientId,
  client_secret: clientSecret,
});

export { paypal };

export const PAYPAL_CONFIG = {
  isDevelopment,
  currency: "EUR",
  locale: "es_ES",
};

console.log(
  `🎯 PayPal configured in ${isDevelopment ? "SANDBOX" : "PRODUCTION"} mode`
);
