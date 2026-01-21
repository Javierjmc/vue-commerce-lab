import { ProductoNutricional } from "./productos";
import { auth, db } from "./firebase/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";

export interface CartItem extends ProductoNutricional {
  quantity: number;
  image: string;
  name?: string;  // Mapeado de producto
  price?: number; // Mapeado de pvp
  category?: string; // Mapeado de categoriaPorPatologia
  stock?: number; // Stock fijo
}

const CART_STORAGE_KEY = "ecommerce_cart";
const CART_COLLECTION = "carts";

// Obtener el ID del carrito de Firestore
const getCartDocId = (userId: string) => `${userId}_cart`;

// Storage local como fallback
const localCartStorage = {
  get: (): CartItem[] => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  },

  set: (cart: CartItem[]): void => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

// Storage en Firestore para usuarios autenticados
export const firebaseCartStorage = {
  get: async (forceFirebase: boolean = false): Promise<CartItem[]> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return localCartStorage.get();
      }

      const cartDocId = getCartDocId(currentUser.uid);
      const q = query(
        collection(db, `${CART_COLLECTION}/${cartDocId}/items`)
      );
      const querySnapshot = await getDocs(q);

      const items: CartItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data() as CartItem);
      });
      
      // Si no hay carrito en Firebase pero hay en localStorage, sincroniza
      if (items.length === 0 && !forceFirebase) {
        const localCart = localCartStorage.get();
        if (localCart.length > 0) {
          // Sincroniza el carrito local a Firebase
          await firebaseCartStorage.set(localCart);
          return localCart;
        }
      }
      
      return items;
    } catch (error) {
      console.error("Error loading cart from Firebase:", error);
      return localCartStorage.get();
    }
  },

  set: async (cart: CartItem[]): Promise<void> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        localCartStorage.set(cart);
        return;
      }

      const cartDocId = getCartDocId(currentUser.uid);
      const batch = writeBatch(db);

      // Primero elimina los items anteriores
      const q = query(
        collection(db, `${CART_COLLECTION}/${cartDocId}/items`)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Crea la estructura del documento principal si no existe
      const cartMainRef = doc(db, CART_COLLECTION, cartDocId);
      batch.set(
        cartMainRef,
        {
          userId: currentUser.uid,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      // Añade los nuevos items
      cart.forEach((item, index) => {
        const itemRef = doc(
          db,
          `${CART_COLLECTION}/${cartDocId}/items`,
          item.id.toString()
        );
        batch.set(itemRef, {
          ...item,
          addedAt: new Date(),
        });
      });

      await batch.commit();
    } catch (error) {
      console.error("Error saving cart to Firebase:", error);
      localCartStorage.set(cart);
    }
  },

  clear: async (): Promise<void> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        localCartStorage.clear();
        return;
      }

      const cartDocId = getCartDocId(currentUser.uid);
      const q = query(
        collection(db, `${CART_COLLECTION}/${cartDocId}/items`)
      );
      const querySnapshot = await getDocs(q);

      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error("Error clearing cart:", error);
      localCartStorage.clear();
    }
  },
};

// Exportar como cartStorage por compatibilidad
export const cartStorage = firebaseCartStorage;

export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartItemCount = (cart: CartItem[]): number => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};
