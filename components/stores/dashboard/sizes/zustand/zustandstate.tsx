import { create } from "zustand";
import { Size } from "@/components/stores/dashboard/sizes/sizes";
import axios from "axios";
// Zustand store to keep track of the items in the size dropdown

// create a store:age with the state
type State = {
  name: string;
  sizes: Size[];
  state: boolean;
};

// create actions to the store (functions that will update the store)
type Action = {
  updateName: (name: State["name"]) => void;
  updateSizes: (sizes: State["sizes"]) => void;
  updateState: (state: State["state"]) => void;
  reFetchSizes: (storeId: string) => void;
};
// create the store with the actions and the state(combines them so you can import them together in other files and use them as one)
export const useSizes = create<State & Action>((set) => ({
  name: "",
  updateName: (name: string) => set(() => ({ name: name })),
  sizes: [],
  updateSizes: (sizes: Size[]) => set(() => ({ sizes: sizes })),
  state: false,
  updateState: (state: boolean) => set(() => ({ state: state })),
  reFetchSizes: (storeId: string) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeId}/sizes`, {})
      .then(function (response) {
        set(() => ({ sizes: response.data }));
      })
      .catch(function (error) {
        console.log(error);
        return;
      });
  },
}));
