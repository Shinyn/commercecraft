import { create } from "zustand";
import { Billboard } from "@/components/dashboard/billboards/billboards";
import axios from "axios"

// Zustand 
// create a store:age with the state
type State = {
    billboards: Billboard[];
};

// create actions to the 
type Action = {
    updateBillboards: (Billboards: State["billboards"]) => void;//Updates billboards saved in state
    reFetchBillboards: () => void;//Updates billboards saved in state
};
// create the store with the actions and the state(combines them so you can import them together in other files and use them as one)
export const BillboardState = create<State & Action>((set) => ({
    billboards: [],
    updateBillboards: (billboards: Billboard[]) =>
        set(() => ({ billboards: billboards })),
    reFetchBillboards:()=>{
        axios.get("/api/billboards", {})
        .then(function (response) {
          set(() => ({ billboards: response.data }))
        })
        .catch(function (error) {
          console.log(error);
          return
        }); 
    }
}));


