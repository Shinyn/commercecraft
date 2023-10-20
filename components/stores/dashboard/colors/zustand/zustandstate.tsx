import { create } from "zustand";
import { Color } from "@/components/stores/dashboard/colors/colors";
import axios from "axios";

// Zustand store to keep track of the items in the color dropdown

// create a store:age with the state
type State = {
  name: string;
  colors: Color[];
  state: boolean;
};

// create actions to the store (functions that will update the store)
type Action = {
  updateName: (name: State["name"]) => void;
  updateColors: (colors: State["colors"]) => void;
  updateState: (state: State["state"]) => void;
  reFetchColors: (storeId: string) => void;
};
// create the store with the actions and the state(combines them so you can import them together in other files and use them as one)
export const useColors = create<State & Action>((set) => ({
  name: "",
  updateName: (name: string) => set(() => ({ name: name })),
  colors: [],
  updateColors: (colors: Color[]) => set(() => ({ colors: colors })),
  state: false,
  updateState: (state: boolean) => set(() => ({ state: state })),
  reFetchColors: (storeId: string) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeId}/colors`, {})
      .then(function (response) {
        set(() => ({ colors: response.data }));
      })
      .catch(function (error) {
        console.log(error);
        return;
      });
  },
}));
