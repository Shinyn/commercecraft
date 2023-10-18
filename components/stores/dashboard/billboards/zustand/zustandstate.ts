import { create } from "zustand";
import { Billboard } from "@/components/stores/dashboard/billboards/billboards";
// Zustand
import axios from "axios";
// create a store:age with the state
type State = {
  billboards: Billboard[];
};

// create actions to the 
type Action = {
  updateBillboards: (Billboards: State["billboards"]) => void;//Updates billboards saved in state
  reFetchBillboards: (storeId:string) => void;//Updates billboards saved in state
};
// create the store with the actions and the state(combines them so you can import them together in other files and use them as one)
export const useBillboards = create<State & Action>((set) => ({
  billboards: [],
  updateBillboards: (billboards: Billboard[]) =>
      set(() => ({ billboards: billboards })),
  reFetchBillboards:(storeId:string)=>{
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeId}/billboards`, {})
      .then(function (response) {
        set(() => ({ billboards: response.data }))
      })
      .catch(function (error) {
        console.log(error);
        return
      }); 
  }
}));
