import { create } from "zustand";
import { Billboard } from "@/components/stores/dashboard/billboards/billboards";
// Zustand
// create a store:age with the state
type State = {
  storeID: string;
};

// create actions to the
type Action = {
  updateStoreID: (storeID: State["storeID"]) => void; //Updates billboards saved in state
};
// create the store with the actions and the state(combines them so you can import them together in other files and use them as one)
export const storeState = create<State & Action>((set) => ({
  storeID: "",
  updateStoreID: (newstoreID: string) =>
    set(() => ({ storeID: newstoreID })),
}));
