import { useState, useEffect } from "react";
import { Product } from "@/lib/products";
import { CartItem, cartStorage } from "@/lib/cart";
import { toast } from "@/hooks/use-toast";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(cartStorage.get());
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      
      let newCart: CartItem[];
      if (existingItem) {
        newCart = currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast({
          title: "Actualizado",
          description: `${product.name} actualizado en el carrito`,
        });
      } else {
        newCart = [...currentCart, { ...product, quantity }];
        toast({
          title: "Añadido al carrito",
          description: `${product.name} añadido correctamente`,
        });
      }
      
      cartStorage.set(newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => {
      const newCart = currentCart.filter((item) => item.id !== productId);
      cartStorage.set(newCart);
      toast({
        title: "Eliminado",
        description: "Producto eliminado del carrito",
      });
      return newCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart((currentCart) => {
      const newCart = currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      cartStorage.set(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    cartStorage.clear();
    toast({
      title: "Carrito vaciado",
      description: "Todos los productos han sido eliminados",
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
