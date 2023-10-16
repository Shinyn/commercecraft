import { create } from "zustand";
import { Customer } from "@/components/stores/dashboard/customers/customer";
// Zustand state tyo keep track of the customers for a chosen store

type State = {
  customers: Customer[];
};

//actions (functions that will update the value of the customers)
type Action = {
  updateCustomers: (customers: State["customers"]) => void;
};
// create the state including actions to export them together
export const useCustomers = create<State & Action>((set) => ({ 
  customers: [],
  updateCustomers: (customers: Customer[]) =>
    set(() => ({ customers: customers })),
}));
