import { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useAuth } from "@/context/AuthContext";
import { functions } from "@/lib/firebase/firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface PaymentFormProps {
  amount: number;
  onSuccess?: (paymentIntentId: string) => void;
  isLoading?: boolean;
}

const PaymentForm = ({ amount, onSuccess, isLoading = false }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements || !user) {
      setError("No se pudieron cargar los componentes de pago");
      return;
    }

    setProcessing(true);

    try {
      // Obtener el CardElement
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Elemento de tarjeta no encontrado");
      }

      // Crear payment method
      const { error: paymentError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {},
        });

      if (paymentError) {
        setError(paymentError.message || "Error al procesar el pago");
        setProcessing(false);
        return;
      }

      if (!paymentMethod) {
        setError("No se pudo crear el método de pago");
        setProcessing(false);
        return;
      }

      // Llamar a la Cloud Function para crear el PaymentIntent
      const createPaymentIntentFn = httpsCallable(
        functions,
        "createPaymentIntent"
      );

      const orderId = uuidv4();
      const response = await createPaymentIntentFn({
        paymentMethodId: paymentMethod.id,
        amount,
        orderId,
        customerEmail: user.email,
        description: `Compra en vue-commerce-lab - ${orderId}`,
      });

      const { success: paymentSuccess, paymentIntentId, status } =
        response.data as any;

      if (!paymentSuccess) {
        throw new Error("El servidor rechazó el pago");
      }

      // Verificar estado del pago
      if (status === "succeeded") {
        setSuccess(true);
        if (onSuccess) {
          onSuccess(paymentIntentId);
        }
      } else if (status === "requires_action") {
        // Aquí podrías implementar confirmación adicional si es necesario
        setError(
          "Tu pago requiere autenticación adicional. Por favor, sigue las instrucciones en tu tarjeta."
        );
      } else {
        setError(`Estado del pago: ${status}`);
      }

      // Limpiar el formulario
      cardElement.clear();
    } catch (err: any) {
      console.error("Error procesando pago:", err);
      setError(err.message || "Error al procesar el pago");
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          ¡Pago procesado exitosamente! Tu pedido ha sido confirmado.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <div className="border border-border rounded-lg p-4 bg-card">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "hsl(var(--foreground))",
                "::placeholder": {
                  color: "hsl(var(--muted-foreground))",
                },
              },
              invalid: {
                color: "hsl(var(--destructive))",
              },
            },
            hidePostalCode: false,
          }}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Monto a pagar: <span className="font-semibold">${amount.toFixed(2)}</span>
      </p>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || processing || isLoading}
      >
        {processing || isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando...
          </>
        ) : (
          `Pagar $${amount.toFixed(2)}`
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Tu pago es seguro y encriptado por Stripe
      </p>
    </form>
  );
};

export default PaymentForm;
