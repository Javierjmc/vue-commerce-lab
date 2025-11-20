import { ShoppingCart, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { getCartItemCount } from "@/lib/cart";
import { useCart } from "@/hooks/useCart";

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = getCartItemCount(cart);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Store className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TechStore
          </span>
        </Link>

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
