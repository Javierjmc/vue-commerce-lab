import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { functions } from "@/lib/firebase/firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

interface PayPalButtonProps {
  amount: number;
  onSuccess?: (orderId: string) => void;
  isLoading?: boolean;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPalButton = ({ amount, onSuccess, isLoading = false }: PayPalButtonProps) => {
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Verificar si PayPal está cargado
    if (!window.paypal) {
      setError("PayPal no está cargado. Recarga la página.");
      return;
    }

    if (!containerRef.current) {
      return;
    }

    // Limpiar botones previos
    containerRef.current.innerHTML = "";

    window.paypal
      .Buttons({
        createOrder: async (data: any, actions: any) => {
          setProcessing(true);
          try {
            // Llamar a Cloud Function para crear la orden en PayPal
            const createPayPalOrderFn = httpsCallable(
              functions,
              "createPayPalOrder"
            );

            const response = await createPayPalOrderFn({
              amount: amount.toFixed(2),
              customerEmail: user?.email,
              description: `Compra en vue-commerce-lab`,
            });

            const { orderId } = response.data as any;
            return orderId;
          } catch (err: any) {
            console.error("Error creando orden PayPal:", err);
            setError("Error al crear la orden. Intenta de nuevo.");
            setProcessing(false);
            throw err;
          }
        },

        onApprove: async (data: any, actions: any) => {
          try {
            // Llamar a Cloud Function para capturar el pago
            const capturePayPalFn = httpsCallable(functions, "capturePayPal");

            const response = await capturePayPalFn({
              orderID: data.orderID,
            });

            const { success: captureSuccess } = response.data as any;

            if (captureSuccess) {
              setSuccess(true);
              if (onSuccess) {
                onSuccess(data.orderID);
              }
            }
          } catch (err: any) {
            console.error("Error capturando pago PayPal:", err);
            setError("Error al procesar el pago. Contacta a soporte.");
          } finally {
            setProcessing(false);
          }
        },

        onError: (err: any) => {
          console.error("Error en PayPal:", err);
          setError("Error en PayPal. Intenta de nuevo.");
          setProcessing(false);
        },

        onCancel: (data: any) => {
          console.log("Pago cancelado:", data);
          setError("Pago cancelado por el usuario.");
          setProcessing(false);
        },

        style: {
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "pay",
          height: 45,
        },
      })
      .render(containerRef.current)
      .catch((err: any) => {
        console.error("Error renderizando botón PayPal:", err);
        setError("Error al cargar el botón de PayPal");
      });
  }, [amount, user, onSuccess]);

  if (success) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          ¡Pago con PayPal procesado exitosamente! Tu pedido ha sido confirmado.
        </AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      {processing && (
        <div className="flex items-center justify-center gap-2 py-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Procesando pago...
          </span>
        </div>
      )}
      <div
        ref={containerRef}
        className={processing ? "opacity-50 pointer-events-none" : ""}
      />
      <p className="text-xs text-muted-foreground text-center">
        Tu pago es seguro y está protegido por PayPal
      </p>
    </div>
  );
};

export default PayPalButton;
