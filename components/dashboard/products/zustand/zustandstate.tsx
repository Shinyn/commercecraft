import { create } from "zustand";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

type ProductStore = {
  products: Product[]; // An array of products
  updateProducts: (newProducts: Product[]) => void; // Function to update products
  addProduct: (product: Product) => void; // Function to add a new product
  deleteProduct: (productId: string) => void; // Function to delete a product
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [], // Initial empty array of products
  updateProducts: (newProducts) => set({ products: newProducts }), // Update products
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })), // Add a new product
  deleteProduct: (productId) => set((state) => ({ products: state.products.filter((p) => p.id !== productId) })), // Delete a product
}));
