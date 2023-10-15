import { Order } from "@/components/stores/dashboard/orders/order";
import { create } from "zustand";

type State = {
  orders: Order[];
};

//actions (functions that will update the value of the customers)
type Action = {
  updateOrders: (orders: State["orders"]) => void;
};
// create the state including actions to export them together
export const useOrders = create<State & Action>((set) => ({
  orders: [],
  updateOrders: (orders: Order[]) => set(() => ({ orders: orders })),
}));
