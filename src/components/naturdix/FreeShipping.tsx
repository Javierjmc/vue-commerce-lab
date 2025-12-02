import { Package, Leaf } from "lucide-react";

const FreeShipping = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-secondary to-accent text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand badge */}
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Leaf className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white italic drop-shadow-md">Vitasfera</h3>
              <p className="text-base text-white opacity-90 font-medium">HERBOLARIO DE CONFIANZA</p>
            </div>
          </div>

          {/* Free shipping */}
          <div className="flex items-center gap-4 bg-background text-primary px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Package className="w-10 h-10 flex-shrink-0" />
            <div>
              <p className="text-3xl font-black leading-tight">ENVÍOS ¡GRATIS!*</p>
              <p className="text-sm opacity-80 text-muted-foreground">*Pedidos a partir de 50€</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center md:text-right">
            <p className="text-xl font-bold text-white mb-1">¡No te quedes sin tu</p>
            <p className="text-4xl font-black text-white leading-tight drop-shadow-md">TRATAMIENTO!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeShipping;
