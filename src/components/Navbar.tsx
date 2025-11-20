import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { getCartItemCount } from "@/lib/cart";
import { useCart } from "@/hooks/useCart";
import TickerOfertas from "./TickerOfertas";
import logo from "../assets/logo-herbolario.png";

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = getCartItemCount(cart);

  const navLinks = [
    { name: "Inicio", to: "/" },
    { name: "Nosotras", to: "/nosotras" },
    { name: "Testimonios", to: "/testimonios" },
    { name: "Tienda", to: "/tienda" },
    { name: "Blog", to: "/blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <TickerOfertas />
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="transition-transform hover:scale-105">
          <img src={logo} alt="Logo" className="w-[220px]" />
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="px-3 py-2 font-medium transition-colors hover:text-accent"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Carrito */}
        <Link
          to="/cart"
          className="relative flex items-center gap-2 rounded-lg px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="font-medium">Carrito</span>
          {itemCount > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
              {itemCount}
            </Badge>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
