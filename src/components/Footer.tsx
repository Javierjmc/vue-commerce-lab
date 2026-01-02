import { Link } from "react-router-dom";
import {  
  Mail,
  Phone,
} from "lucide-react";

import logoBlanco from "../assets/logo-blanco.png";
import visaLogo from "../assets/visa.png";
import masterLogo from "../assets/mastercard.png";
import paypalLogo from "../assets/logo-paypal.png";
import { Input } from "@/components/ui/input";
import { ButtonNaturdix } from "@/components/naturdix/ButtonNaturdix";
import { RedesSociales } from "./RedesSociales";
import { MetodosPago } from "./MetodosPago";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black to-[#2e901f] text-primary-foreground pt-16 pb-10 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

        {/* LOGO + DESCRIPCIÓN + REDES */}
        <div className="col-span-1">
          <img src={logoBlanco} alt="Logo Vitasfera" className="h-16 md:h-32 mb-6" />

          <p className="text-sm opacity-90 leading-relaxed pr-0 md:pr-6">
            Productos naturales y soluciones de bienestar. Envíos rápidos,
            atención personalizada y seguridad en tu compra.
          </p>
          <MetodosPago />          
        </div>

        {/* ENLACES PRINCIPALES */}
        <div>
          <h3 className="font-semibold text-lg mb-5 text-secondary">Explorar</h3>

          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-accent transition">Inicio</Link></li>
            <li><Link to="/nosotras" className="hover:text-accent transition">Nosotras</Link></li>
            <li><Link to="/tienda" className="hover:text-accent transition">Tienda</Link></li>
            <li><Link to="/blog" className="hover:text-accent transition">Blog</Link></li>
            <li><Link to="/contacto" className="hover:text-accent transition">Contacto</Link></li>
          </ul>
        </div>

        {/* CONTACTO + SOPORTE */}
        <div className="mt-8 md:mt-0">
          <h3 className="font-semibold text-lg mb-5 text-secondary">Soporte</h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent" />
              info@herbolariovitasfera.com
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent" />
              91 882 85 19
            </li>

            <li>
              <Link to="/nosotras#preguntas-frecuentes" className="hover:text-accent transition">
                Preguntas frecuentes
              </Link>
            </li>

            <li>
              <Link to="/privacidad" className="hover:text-accent transition">
                Política de Privacidad
              </Link>
            </li>

            <li>
              <Link
                to="/contacto"
                className="block text-center mt-4 bg-accent hover:bg-accent/90 text-primary-foreground py-2 rounded-lg transition"
              >
                Contáctanos
              </Link>
            </li>
          </ul>
        </div>

        {/* SUSCRIPCIÓN + MÉTODOS DE PAGO */}
        <div className="mt-8 md:mt-0 lg:mt-0">
          <RedesSociales />

          <h3 className="font-semibold text-lg mb-5 text-secondary">
            Mantente Informado
          </h3>

          <p className="text-sm opacity-90 mb-4">
            Recibe descuentos, novedades y contenido exclusivo.
          </p>

          <form className="flex flex-col gap-3 text-black">
            <Input
              type="email"
              placeholder="Tu email"
              className="h-10 bg-primary-dark/50 border border-secondary focus:ring-2 focus:ring-accent text-sm text-primary-foreground placeholder:text-primary-foreground/70"
            />

            <ButtonNaturdix
              variant="accent"
              size="default"
              className="w-full"
            >
              Suscribirme
            </ButtonNaturdix>
          </form>


        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-primary-foreground/70 text-xs mt-14 border-t border-secondary/30 pt-6">
        © {new Date().getFullYear()} Vitasfera. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;

