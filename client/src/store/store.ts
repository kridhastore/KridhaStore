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

export const useStore = create<Store>((set) => ({
  cartProducts: [],
  checkoutProducts: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.cartProducts.find((p) => p._id === product._id);
      if (existing) {
        return {
          cartProducts: state.cartProducts.map((p) =>
            p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      }
      return {
        cartProducts: [...state.cartProducts, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (_id) =>
    set((state) => ({
      cartProducts: state.cartProducts.filter((p) => p._id !== _id),
    })),

  clearCart: () => set({ cartProducts: [] }),

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

export const fetchProducts = async (): Promise<
  ProductInterface[] | undefined
> => {
  try {
    const response = await axios.get(`${apiUrl}/api/products/all`);
    const products: ProductInterface[] = response.data.products; // ✅ array of Product
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const fetchCollections = async (): Promise<
  CollectionInterface[] | undefined
> => {
  try {
    const response = await axios.get(`${apiUrl}/api/categories/all`);
    const collections: CollectionInterface[] = response.data.categories; // ✅ array of Product
    return collections;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
