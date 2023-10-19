import { Order } from "@/components/stores/dashboard/orders/order";
import { create } from "zustand";
import axios from "axios";

type State = {
  orders: Order[];
};

//actions (functions that will update the value of the customers)
type Action = {
  updateOrders: (orders: State["orders"]) => void;
  reFetchOrders: (storeId: string) => void;//Updates orders saved in state
  reFetchCompleteOrders:(storeId: string) => void;//Updates orders saved in state
};
// create the state including actions to export them together
export const useOrders = create<State & Action>((set) => ({
  orders: [],
  updateOrders: (orders: Order[]) => set(() => ({ orders: orders })),
  reFetchOrders: (storeId: string) => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeId}/orders`, {})
      .then(function (response) {
        set(() => ({ orders: response.data }))
      })
      .catch(function (error) {
        console.log(error);
        return
      });
  },
  reFetchCompleteOrders:(storeId: string) =>{
  axios
  .get(`/api/${storeId}/orders/all`, {})
  .then(function (response) {
    const promises = response.data.map((order: any) => {
      if (order.customerId === "Not specified") return order;
      return axios
        .get(`/api/${storeId}/customers/${order.customerId}`, {})
        .then(function (res) {
          order.order_date = (
            order.order_date.split("T")[0] +
            " " +
            order.order_date.split("T")[1].split(".")[0]
          )
            .replace(/-/g, "/")
            .replace(" ", " at ");
          order.customerName = res.data.firstName + " " + res.data.lastName;
          order.customerEmail = res.data.e_mail;
          order.customerPhone = res.data.phone;
          order.customerstreet = res.data.street;
          order.customerCity = res.data.city;
          return order;
        })
        .catch(function (error) {
          console.log(error);
          return order;
        });
    });

    Promise.all(promises)
      .then((updatedOrders) => {

        set(()=>({orders:updatedOrders}))
       // updateOrders(orderstogether);
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  .catch(function (error) {
    console.log(error);
  });
}
}));
