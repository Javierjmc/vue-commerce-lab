import Stripe from "stripe";

// Determinar entorno
const isDevelopment = process.env.FUNCTIONS_EMULATOR === "true" || 
                      process.env.NODE_ENV === "development";

// Obtener clave secreta según el entorno
const stripeSecretKey = isDevelopment
  ? process.env.STRIPE_SECRET_KEY_DEV
  : process.env.STRIPE_SECRET_KEY_PROD;

if (!stripeSecretKey) {
  throw new Error(
    `Stripe secret key not found for ${isDevelopment ? "development" : "production"} environment`
  );
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

export const STRIPE_CONFIG = {
  isDevelopment,
  currency: "eur",
  webhookSecret: isDevelopment
    ? process.env.STRIPE_WEBHOOK_SECRET_DEV || ""
    : process.env.STRIPE_WEBHOOK_SECRET_PROD || "",
};

console.log(
  `🚀 Stripe initialized in ${isDevelopment ? "DEVELOPMENT" : "PRODUCTION"} mode`
);
