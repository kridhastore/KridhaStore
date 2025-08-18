import { create } from "zustand";
import axios from "axios";
import type { ProductInterface } from "../types/product.types";

interface ProductStore {
  products: ProductInterface[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (
    product: Omit<ProductInterface, "_id" | "createdAt" | "updatedAt">
  ) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, updates: Partial<ProductInterface>) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,

  // ✅ Fetch from API

  fetchProducts: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(
        "https://kridhastore.onrender.com/api/products/all"
      );
      // ✅ ensure we set an array
      set({ products: res.data.products || [], loading: false });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      set({ loading: false });
    }
  },

  addProduct: (productData) => {
    const newProduct: ProductInterface = {
      ...productData,
      _id: Date.now().toString(), // Temporary ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ products: [newProduct, ...state.products] }));
  },

  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p._id !== id),
    }));
  },

  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map((p) =>
        p._id === id
          ? { ...p, ...updates, updatedAt: new Date().toISOString() }
          : p
      ),
    }));
  },
}));
