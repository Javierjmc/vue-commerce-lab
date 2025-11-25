import { ProductoNutricional } from "./productos";

export interface CartItem extends ProductoNutricional {
  quantity: number;
  image: string; // Añadir la propiedad de imagen al CartItem
}

const CART_STORAGE_KEY = "ecommerce_cart";

export const cartStorage = {
  get: (): CartItem[] => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  },

  set: (cart: CartItem[]): void => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }
};

export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartItemCount = (cart: CartItem[]): number => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};
