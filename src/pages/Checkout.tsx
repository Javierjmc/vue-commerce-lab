import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import Navbar from "@/components/Navbar";
import PaymentForm from "@/components/PaymentForm";
import { StripeProvider } from "@/context/StripeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { calculateCartTotal } from "@/lib/cart";
import { toast } from "@/hooks/use-toast";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const total = calculateCartTotal(cart);
  const shipping = 10;
  const finalTotal = total + shipping;

  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log("Pago exitoso:", paymentIntentId);
    
    toast({
      title: "¡Pedido confirmado!",
      description: "Tu pedido ha sido procesado exitosamente",
    });

    // Aquí podrías guardar el pedido en Firestore con los detalles
    clearCart();
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate("/cart")}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al carrito
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="mb-6 text-3xl font-bold">Finalizar compra</h1>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input 
                        id="firstName" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input 
                        id="lastName" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dirección de envío</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input 
                      id="address" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input 
                        id="city" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Provincia</Label>
                      <Input 
                        id="state" 
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Código Postal</Label>
                      <Input 
                        id="zip" 
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información de pago (Stripe)</CardTitle>
                </CardHeader>
                <CardContent>
                  <StripeProvider>
                    <PaymentForm 
                      amount={finalTotal} 
                      onSuccess={handlePaymentSuccess}
                      isLoading={loading}
                    />
                  </StripeProvider>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ChatbotWidget />
    </div>
  );
};

export default Checkout;
