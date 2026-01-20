import { useState, useEffect } from "react";
import { ProductoNutricional } from "@/lib/productos";
import { CartItem, cartStorage } from "@/lib/cart";
import { toast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

export const useCart = () => {
  const { user } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

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

    // Escuchar cambios de autenticación
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Usuario se acaba de autenticar, cargar carrito de Firebase
        loadCart();
      } else {
        // Usuario se deslogueó, cargar carrito del localStorage
        try {
          const localCart = localStorage.getItem("ecommerce_cart");
          setCart(localCart ? JSON.parse(localCart) : []);
        } catch (error) {
          console.error("Error loading local cart:", error);
          setCart([]);
        }
      }
    });

    return unsubscribe;
  }, [ user ]);

  const addToCart = async (product: ProductoNutricional, quantity: number = 1) => {
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
          description: `${product.producto} actualizado en el carrito`,
        });
      } else {
        newCart = [...currentCart, { 
          ...product, 
          quantity, 
          image: product.imagenes[0],
          name: product.producto,
          price: parseFloat(product.pvp.replace("€", "").replace(",", ".")),
          category: product.categoriaPorPatologia,
          stock: 999
        }];
        toast({
          title: "Añadido al carrito",
          description: `${product.producto} añadido correctamente`,
        });
      }
      
      // Guardar en Firebase (asincrónico)
      cartStorage.set(newCart).catch(error => {
        console.error("Error saving to cart:", error);
      });
      
      // Si el usuario está autenticado, limpiar localStorage después de guardar en Firebase
      if (user) {
        setTimeout(() => {
          localStorage.removeItem("ecommerce_cart");
        }, 1000);
      }
      
      return newCart;
    });
  };

  const removeFromCart = async (productId: string) => {
    setCart((currentCart) => {
      const newCart = currentCart.filter((item) => item.id.toString() !== productId.toString());
      // Guardar en Firebase (asincrónico)
      cartStorage.set(newCart).catch(error => {
        console.error("Error saving to cart:", error);
      });
      
      toast({
        title: "Eliminado",
        description: "Producto eliminado del carrito",
      });
      return newCart;
    });
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart((currentCart) => {
      const newCart = currentCart.map((item) =>
        item.id.toString() === productId.toString() ? { ...item, quantity } : item
      );
      
      // Guardar en Firebase (asincrónico)
      cartStorage.set(newCart).catch(error => {
        console.error("Error saving to cart:", error);
      });
      
      return newCart;
    });
  };

  const clearCart = async () => {
    setCart([]);
    
    // Guardar en Firebase (asincrónico)
    cartStorage.clear().catch(error => {
      console.error("Error clearing cart:", error);
    });
    
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
    loading,
  };
};
