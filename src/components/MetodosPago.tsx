 import visaLogo from "../assets/visa.png";
import masterLogo from "../assets/mastercard.png";
import paypalLogo from "../assets/logo-paypal.png";
 
 export const MetodosPago = () => {
    return (
         <div className="mt-10">
            <h3 className="font-semibold text-lg mb-4 text-secondary">
              Métodos de Pago
            </h3>

            <div className="flex items-center gap-5">
              <img
                src={visaLogo}
                alt="Visa"
                className="h-12 w-auto hover:opacity-100 transition"
              />

              <img
                src={masterLogo}
                alt="MasterCard"
                className="h-12 w-auto hover:opacity-100 transition"
              />

              <img
                src={paypalLogo}
                alt="PayPal"
                className="h-12 w-auto  hover:opacity-100 transition"
              />
            </div>
          </div>
    )
 }