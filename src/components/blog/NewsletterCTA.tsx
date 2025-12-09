import { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "¡Gracias por suscribirte!",
        description: "Pronto recibirás nuestras últimas novedades.",
      });
      setEmail("");
    }
  };

  return (
    <section className="gradient-cta rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-3">
        Suscríbete a nuestro newsletter
      </h2>
      <p className="text-secondary-foreground/90 mb-6 max-w-lg mx-auto">
        Recibe recetas exclusivas, consejos de salud y ofertas especiales directamente en tu correo
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-5 py-3 rounded-full bg-background/95 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-hover"
        >
          <span>Suscribirse</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </section>
  );
}
