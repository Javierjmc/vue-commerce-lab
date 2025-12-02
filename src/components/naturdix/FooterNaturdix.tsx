import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const FooterNaturdix = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-black mb-4">
              NATURDIX
              <span className="inline-block w-2 h-2 bg-accent rounded-full ml-1"></span>
            </h2>
            <p className="text-sm opacity-90 mb-4">
              Tu tienda de confianza para productos naturales y suplementos de alta calidad.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Enlaces</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:text-accent transition-colors">Inicio</a></li>
              <li><a href="#productos" className="hover:text-accent transition-colors">Productos</a></li>
              <li><a href="#nosotros" className="hover:text-accent transition-colors">Quiénes Somos</a></li>
              <li><a href="#contacto" className="hover:text-accent transition-colors">Contáctanos</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Categorías</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:text-accent transition-colors">Vitaminas</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Suplementos</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Herbolario</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Cosmética Natural</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 opacity-90">
                <Phone className="w-4 h-4 text-accent" />
                +34 900 123 456
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Mail className="w-4 h-4 text-accent" />
                info@naturdix.com
              </li>
              <li className="flex items-start gap-2 opacity-90">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span>Calle Natural, 123<br />28001 Madrid, España</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary/30 mt-8 pt-8 text-center text-sm opacity-75">
          <p>© 2024 Naturdix. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterNaturdix;
