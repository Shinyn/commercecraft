import { create } from "zustand";
import { Product} from "@/components/stores/dashboard/products/products"
import axios from "axios";


type ProductStore = {
  products: Product[]; // An array of products
  updateProducts: (newProducts: Product[]) => void; // Function to update products
  addProduct: (product: Product) => void; // Function to add a new product
  deleteProduct: (productId: string) => void; // Function to delete a product
  reFetchProducts: (storeId:string) => void;//Updates billboards saved in state

};

export const useProductStore = create<ProductStore>((set) => ({
  products: [], // Initial empty array of products
  updateProducts: (newProducts) => set({ products: newProducts }), // Update products
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })), // Add a new product
  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })), // Delete a product
    reFetchProducts:(storeId:string)=>{
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeId}/products/all`, {})
      .then(function (response) {
        set(() => ({ products: response.data }))
      })
      .catch(function (error) {
        console.log(error);
        return
      }); 
  }
}));
