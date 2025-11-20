import { Link } from "react-router-dom";
import { Store, Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import logoBlanco from "../assets/logo-blanco.png";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo y descripción */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logoBlanco} alt="logo de VitasferaHerbolarios" />
          </div>
          <p className="text-gray-300">
            Tu herbolario online de confianza. Productos medicinales naturales, suplementos y cuidado personal para tu bienestar.
          </p>
        </div>

        {/* Enlaces de navegación */}
        <div>
          <h3 className="font-semibold mb-4 text-green-400">Enlaces</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-green-300">Inicio</Link></li>
            <li><Link to="/nosotros" className="hover:text-green-300">Nosotros</Link></li>
            <li><Link to="/tienda" className="hover:text-green-300">Tienda</Link></li>
            <li><Link to="/blog" className="hover:text-green-300">Blog</Link></li>
            <li><Link to="/contacto" className="hover:text-green-300">Contacto</Link></li>
          </ul>
        </div>

        {/* Soporte y contacto */}
        <div>
          <h3 className="font-semibold mb-4 text-green-400">Soporte</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> soporte@vitasfera.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +58 123 456 7890</li>
            <li><Link to="/faq" className="hover:text-green-300">Preguntas frecuentes</Link></li>
            <li><Link to="/devoluciones" className="hover:text-green-300">Política de devoluciones</Link></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="font-semibold mb-4 text-green-400">Síguenos</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-green-300"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="hover:text-green-300"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="hover:text-green-300"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </div>

      {/* Derechos de autor */}
      <div className="border-t border-green-700 mt-10 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} VitasferaHerbolarios. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
