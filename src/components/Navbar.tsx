import { useState } from "react";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { getCartItemCount } from "@/lib/cart";
import { useCart } from "@/hooks/useCart";
import TickerOfertas from "./TickerOfertas";
import logo from "../assets/logo-herbolario.png";
import AdvancedSearchBar from "./AdvancedSearchBar";

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = getCartItemCount(cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Inicio", to: "/" },
    { name: "Nuestro Equipo", to: "/nuestro-equipo" },
    { name: "Testimonios", to: "/testimonios" },
    { name: "Tienda", to: "/tienda" },
    { name: "Blog", to: "/blog" },
    { name: "Contacto", to: "/contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-2xl transition-all duration-300">
      {/* 1. Cinta de ofertas - Estilos mejorados para un color sutil y animación si es necesario */}

      <div className="text-center text-sm text-primary font-bold bg-primary text-primary-foreground py-3">Envío gratis +60€</div>

      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* ========================================================= */}
        {/* FILA SUPERIOR: Búsqueda Avanzada + Iconos (Login/Carrito) */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between h-14 md:h-16 py-2 border-b border-border/50 transition-all duration-300">
          
          {/* Búsqueda Avanzada (Desktop/Tablet) */}
          <div className="hidden md:flex flex-1 mx-auto items-center">
             <AdvancedSearchBar />              
          </div>
          
          {/* Iconos: Carrito + Login */}
          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            
            {/* Icono de Usuario/Login */}
            <Link
              to="/login"
              aria-label="Iniciar sesión"
              className="p-2 md:p-3 rounded-full text-foreground/80 hover:bg-muted hover:text-primary transition-all duration-300 transform hover:scale-105"
            >
              <User className="h-5 w-5 md:h-6 md:w-6" />
            </Link>

            {/* Icono de Carrito */}
            <Link
              to="/cart"
              aria-label={`Carrito de compras con ${itemCount} artículos`}
              className="relative p-2 md:p-3 rounded-full transition-all duration-300 hover:bg-muted hover:text-primary transform hover:scale-105"
            >
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
              {itemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 md:-right-0 md:-top-0 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs font-bold bg-primary text-primary-foreground border-2 border-background shadow-lg animate-ping-once">
                  {itemCount > 9 ? '9+' : itemCount}
                </Badge>
              )}
            </Link>
            
            {/* Botón de menú móvil/hamburguesa */}
            <button
              className="md:hidden p-2 rounded-full text-foreground/80 hover:bg-muted hover:text-primary transition-colors duration-200"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
            
          </div>
        </div>

        {/* ===================================================== */}
        {/* FILA INFERIOR: Logo + Links de Navegación (Desktop)   */}
        {/* ===================================================== */}
        <div className="flex items-center justify-between h-16 md:h-20 py-2">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">
            <img src={logo} alt="Logo" className="w-[160px] md:w-[220px]" />
          </Link>

          {/* Links de navegación (Solo en Desktop y pantallas grandes) */}
          <div className="hidden md:flex flex-1 justify-end gap-1 lg:gap-2 font-semibold text-foreground text-base tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="px-3 lg:px-4 py-2 transition-all duration-300 text-foreground/90 hover:text-primary hover:bg-muted/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* En móvil, solo mostramos el logo */}
          <div className="md:hidden h-full flex items-center">
             {/* Este div está vacío, pero asegura que el logo quede alineado a la izquierda */}
          </div>
        </div>
      </div>
      
      {/* ========================== */}
      {/* Menú móvil deslizante       */}
      {/* ========================== */}
      {open && (
        <div className="md:hidden bg-background border-t border-border absolute w-full animate-in slide-in-from-top-4 duration-500 shadow-2xl">
          <div className="flex flex-col py-6 px-6 sm:px-10 gap-3">
            
            {/* Búsqueda móvil - Prioridad alta */}
            <div className="mb-4">
              <AdvancedSearchBar onSearchSubmit={() => setOpen(false)} />
            </div>

            {/* Links de navegación móvil */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-bold text-foreground transition-colors duration-300 hover:text-primary hover:bg-muted/50 px-2 rounded-md"
              >
                {link.name}
              </Link>
            ))}

            {/* Opciones de Login y Carrito (con texto) */}
            <div className="flex flex-col gap-3 pt-4 border-t border-border mt-4">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-colors duration-300 hover:bg-muted hover:text-primary"
              >
                <User className="h-6 w-6" />
                <span>Iniciar sesión</span>
              </Link>

              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="relative flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-colors duration-300 hover:bg-muted hover:text-primary"
              >
                <ShoppingCart className="h-6 w-6" />
                <span>Carrito</span>
                {itemCount > 0 && (
                  <Badge className="ml-auto flex h-6 w-6 items-center justify-center rounded-full p-0 text-sm font-bold bg-primary text-primary-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;