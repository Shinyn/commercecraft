import { create } from "zustand";
import { Size } from "@/components/stores/dashboard/sizes/sizes";
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
};
// create the store with the actions and the state(combines them so you can import them together in other files and use them as one)
export const useNameStore = create<State & Action>((set) => ({
  name: "",
  updateName: (name: string) => set(() => ({ name: name })),
  sizes: [],
  updateSizes: (sizes: Size[]) => set(() => ({ sizes: sizes })),
  state: false,
  updateState: (state: boolean) => set(() => ({ state: state })),
}));
