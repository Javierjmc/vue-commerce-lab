import { Truck, Check } from "lucide-react";
import { ButtonNaturdix } from "@/components/naturdix/ButtonNaturdix";
import { Input } from "@/components/ui/input";

const benefits = [
  "10% descuento en todo",
  "Acceso a ofertas exclusivas",
  "Envío prioritario",
  "Muestras gratis",
];

const SubscriptionBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              Suscríbete y disfruta de los beneficios
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-6">Únete a nuestra comunidad y no te pierdas nada.</p>
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center lg:justify-start gap-2 text-primary-foreground"
                >
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="font-medium text-lg">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Form */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0">
              <Input
                type="email"
                placeholder="Introduce tu correo electrónico"
                className="flex-1 h-12 bg-background/90 border-0 rounded-lg text-base placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
              />
              <ButtonNaturdix variant="accent" size="lg" className="shadow-lg hover:shadow-xl">
                SUSCRIBIRME
              </ButtonNaturdix>
            </div>
          </div>

          {/* Truck icon - Moved to the right for a better visual flow */}
          <div className="flex-shrink-0 animate-pulse-gentle hidden lg:block">
            <div className="w-48 h-48 bg-background rounded-full flex items-center justify-center shadow-2xl">
              <Truck className="w-24 h-24 text-primary" />
            </div>
          </div>
        
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBanner;
