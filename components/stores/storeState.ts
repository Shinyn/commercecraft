import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { Store } from "@/components/stores/stores";
import { MdRestaurantMenu } from "react-icons/md";
// Zustand
// create a store:age with the state
type State = {
  storeID: string;
  store: Store[];
};

// create actions to the
type Action = {
  updateStoreID: (userId: State["storeID"]) => void;
  refetchStore: (userId: string) => void;
  updateStore: (store: State["store"]) => void;
};
// create the store with the actions and the state(combines them so you can import them together in other files and use them as one)
export const storeState = create<State & Action>((set) => ({
  storeID: "",
  updateStoreID: (newstoreID: string) => set(() => ({ storeID: newstoreID })),
  store: [],
  updateStore: (store: Store[]) => set(() => ({ store: store })),
  refetchStore: (userId: string) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores/${userId}`, {})
      .then(function (response) {
        set(() => ({ store: response.data }));
        return;
      })
      .catch(function (error) {
        toast.error("Error fetching store");
        return;
      });
  },
}));
