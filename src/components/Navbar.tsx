import { useState } from "react";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { getCartItemCount } from "@/lib/cart";
import { useCart } from "@/hooks/useCart";
import TickerOfertas from "./TickerOfertas";
import logo from "../assets/logo-herbolario.png";

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = getCartItemCount(cart);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const navLinks = [
    { name: "Inicio", to: "/" },
    { name: "Nosotras", to: "/nosotras" },
    { name: "Testimonios", to: "/testimonios" },
    { name: "Tienda", to: "/tienda" },
    { name: "Blog", to: "/blog" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/tienda?search=${encodeURIComponent(search.trim())}`);
    setSearch("");
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Cinta de ofertas */}
      <TickerOfertas />

      <div className="container flex flex-col md:flex-row items-center justify-between h-auto md:h-20 py-2 md:py-0 gap-2 md:gap-0">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          {/* Logo */}
          <Link to="/" className="transition-transform hover:scale-105">
            <img src={logo} alt="Logo" className="w-[200px]" />
          </Link>

          {/* Botón móvil */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent/20 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop links + búsqueda + carrito + login */}
        <div className="hidden md:flex flex-1 items-center justify-between gap-8">
          {/* Links */}
          <div className="flex gap-6 font-medium text-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="px-3 py-2 transition-colors hover:text-accent hover:underline underline-offset-4"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Búsqueda */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos…"
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
            <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Iconos: Carrito + Login */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="flex items-center gap-1 text-foreground hover:text-accent transition"
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Iniciar sesión</span>
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 rounded-lg px-4 py-2 transition-colors hover:bg-accent/20"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">Carrito</span>
              {itemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs bg-accent text-accent-foreground">
                  {itemCount}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="flex flex-col py-4 px-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setOpen(false)}
                className="py-2 text-lg font-medium transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}

            {/* Búsqueda móvil */}
            <form onSubmit={handleSearch} className="mt-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar productos…"
                className="w-full rounded-lg border border-border bg-background/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </form>

            {/* Iconos móviles: Login + Carrito */}
            <div className="flex gap-4 pt-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1 text-foreground hover:text-accent transition"
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Iniciar sesión</span>
              </Link>

              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="relative flex items-center gap-3 rounded-lg px-4 py-2 border border-border transition-colors hover:bg-accent/20"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Carrito</span>
                {itemCount > 0 && (
                  <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs bg-accent text-accent-foreground">
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
