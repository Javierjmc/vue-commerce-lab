import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ProductoNutricional } from "@/lib/productos";
import { CartItem, cartStorage } from "@/lib/cart";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface CartContextType {
  cart: CartItem[];
  count: number;
  loading: boolean;
  addToCart: (product: ProductoNutricional, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Actualizar contador cuando el carrito cambia
  useEffect(() => {
    console.log("Cart updated:", cart);
    setCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  // Cargar carrito cuando el usuario se autentica
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        // Usar forceFirebase=true cuando hay usuario autenticado para priorizar Firebase
        const forceFirebase = !!user;
        const loadedCart = await cartStorage.get(forceFirebase);
        console.log("Carrito cargado:", loadedCart);
        setCart(loadedCart);
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [user]);

  const addToCart = (product: ProductoNutricional, quantity: number = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      console.log("adding to cart...", existingItem);
      let newCart: CartItem[];
      if (existingItem) {
        newCart = currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast({
          title: "Actualizado",
          description: `${product.producto} actualizado en el carrito`,
        });
      } else {
        newCart = [
          ...currentCart,
          {
            ...product,
            quantity,
            image: product.imagenes[0],
            name: product.producto,
            price: parseFloat(
              product.pvp.replace("€", "").replace(",", ".")
            ),
            category: product.categoriaPorPatologia,
            stock: 999,
          },
        ];
        toast({
          title: "Añadido al carrito",
          description: `${product.producto} añadido correctamente`,
        });
      }

      // Guardar en Firebase (asincrónico) - no esperar para no bloquear la UI
      cartStorage.set(newCart).catch((error) => {
        console.error("Error saving to cart:", error);
      });

      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => {
      const newCart = currentCart.filter(
        (item) => item.id.toString() !== productId.toString()
      );

      toast({
        title: "Eliminado",
        description: "Producto eliminado del carrito",
      });

      // Guardar en Firebase (asincrónico) - no esperar para no bloquear la UI
      cartStorage.set(newCart).catch((error) => {
        console.error("Error saving to cart:", error);
      });

      return newCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;

    setCart((currentCart) => {
      const newCart = currentCart.map((item) =>
        item.id.toString() === productId.toString()
          ? { ...item, quantity }
          : item
      );
      console.log("saving...");
      // Guardar en Firebase (asincrónico) - no esperar para no bloquear la UI
      cartStorage.set(newCart).catch((error) => {
        console.error("Error saving to cart:", error);
      });

      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);

    // Guardar en Firebase (asincrónico)
    cartStorage.clear().catch((error) => {
      console.error("Error clearing cart:", error);
    });

    toast({
      title: "Carrito vaciado",
      description: "Todos los productos han sido eliminados",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
