import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { getCartItemCount } from "@/lib/cart";
import { useCart } from "@/hooks/useCart";
import UserMenu from "@/components/UserMenu";
import logo from "../assets/logo-herbolario.png";
import AdvancedSearchBar from "./AdvancedSearchBar";

const Navbar = () => {
  const { cart, count:itemCount } = useCart();
  const [_itemCount, setItemCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
      const count = getCartItemCount(cart);
      console.log("Actualizando itemCount en Navbar:", count);
      setItemCount(count);
  },[cart])

  const navLinks = [
    { name: "Inicio", to: "/" },
    { name: "Nuestro Equipo", to: "/nuestro-equipo" },
    { name: "Testimonios", to: "/testimonios" },
    { name: "Tienda", to: "/tienda" },
    // { name: "Blog", to: "/blog" },
    { name: "Contacto", to: "/contacto" },
    // { name: "Blog", to: "/blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-2xl transition-all duration-300">
      {/* 1. Cinta de ofertas - Estilos mejorados para un color sutil y animación si es necesario */}

      <div className="text-center text-sm text-primary font-bold bg-primary text-primary-foreground py-3">Envío gratis +60€</div>

      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        
        {/* ========================================================= */}
        {/* FILA SUPERIOR: Búsqueda Avanzada + Iconos (Login/Carrito) */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between min-h-[80px] md:min-h-[100px] py-4 md:py-6 px-2 md:px-4 border-b border-border/50 transition-all duration-300">
          
          {/* Búsqueda Avanzada (Desktop/Tablet) - Con más espacio y separación */}
          <div className="hidden md:flex flex-1 items-center justify-center w-full mx-auto px-4 md:px-8">
             <AdvancedSearchBar />              
          </div>
          
          {/* Iconos: Carrito + Login - Con más separación */}
          <div className="flex items-center gap-3 md:gap-5 ml-4 md:ml-6">
            
            {/* Menú de Usuario */}
            <div className="flex-shrink-0">
              <UserMenu />
            </div>

            {/* Icono de Carrito - Mejorado */}
            <Link
              to="/cart"
              aria-label={`Carrito de compras con ${itemCount} artículos`}
              className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/5 hover:text-primary transform hover:scale-105 active:scale-95 border border-transparent hover:border-primary/20"
            >
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
              {itemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 md:-right-0 md:-top-0 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full p-0 text-xs font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-2 border-background shadow-lg animate-pulse-soft">
                  {itemCount > 9 ? '9+' : itemCount}
                </Badge>
              )}
            </Link>
            
            {/* Botón de menú móvil/hamburguesa */}
            <button
              className="md:hidden p-2.5 rounded-xl text-foreground/80 hover:bg-muted hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20"
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
            
            {/* Búsqueda móvil - Prioridad alta con mejor espaciado */}
            <div className="mb-6 px-2">
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
              <div className="block md:hidden">
                <UserMenu />
              </div>

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