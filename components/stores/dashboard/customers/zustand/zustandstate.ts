import { create } from "zustand";
import { Customer } from "@/components/stores/dashboard/customers/customer";
import axios from "axios";
// Zustand state tyo keep track of the customers for a chosen store

type State = {
  customers: Customer[];
};

//actions (functions that will update the value of the customers)
type Action = {
  updateCustomers: (customers: State["customers"]) => void;
  reFetchCustomers: (storeId: string) => void;//Updates customers saved in state

};
// create the state including actions to export them together
export const useCustomers = create<State & Action>((set) => ({
  customers: [],
  updateCustomers: (customers: Customer[]) =>
    set(() => ({ customers: customers })),
  reFetchCustomers: (storeId: string) => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeId}/customers`, {})
      .then(function (response) {
        set(() => ({ customers: response.data }))
      })
      .catch(function (error) {
        console.log(error);
        return
      });
  }
}));
