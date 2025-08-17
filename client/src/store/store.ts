import { create } from "zustand";
import axios from "axios";
import type { ProductInterface, CollectionInterface } from "./types";

const apiUrl = import.meta.env.VITE_API_URL;

export interface CartProduct extends ProductInterface {
  quantity: number;
}

type Store = {
  cartProducts: CartProduct[];
  checkoutProducts: CartProduct[];

  // cart methods
  addToCart: (product: ProductInterface) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;

  // checkout methods
  startCheckoutFromCart: () => void;
  startCheckoutBuyNow: (product: ProductInterface) => void;
  clearCheckout: () => void;
};

// ✅ Utility functions for localStorage
const loadCart = (): CartProduct[] => {
  try {
    const saved = localStorage.getItem("cartProducts");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCart = (cart: CartProduct[]) => {
  localStorage.setItem("cartProducts", JSON.stringify(cart));
};

export const useStore = create<Store>((set) => ({
  cartProducts: loadCart(), // ✅ hydrate from localStorage
  checkoutProducts: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.cartProducts.find((p) => p._id === product._id);
      let updatedCart: CartProduct[];
      if (existing) {
        updatedCart = state.cartProducts.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        updatedCart = [...state.cartProducts, { ...product, quantity: 1 }];
      }
      saveCart(updatedCart); // ✅ save to localStorage
      return { cartProducts: updatedCart };
    }),

  removeFromCart: (_id) =>
    set((state) => {
      const updatedCart = state.cartProducts.filter((p) => p._id !== _id);
      saveCart(updatedCart);
      return { cartProducts: updatedCart };
    }),

  clearCart: () =>
    set(() => {
      saveCart([]);
      return { cartProducts: [] };
    }),

  // checkout methods
  startCheckoutFromCart: () =>
    set((state) => ({
      checkoutProducts: [...state.cartProducts],
    })),

  startCheckoutBuyNow: (product) =>
    set({
      checkoutProducts: [{ ...product, quantity: 1 }],
    }),

  clearCheckout: () => set({ checkoutProducts: [] }),
}));

// ✅ API calls
export const fetchProducts = async (): Promise<
  ProductInterface[] | undefined
> => {
  try {
    const response = await axios.get(`${apiUrl}/api/products/all`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const fetchCollections = async (): Promise<
  CollectionInterface[] | undefined
> => {
  try {
    const response = await axios.get(`${apiUrl}/api/categories/all`);
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};
