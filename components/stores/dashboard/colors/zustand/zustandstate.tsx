import { create } from "zustand";
import { Color } from "@/components/stores/dashboard/colors/colors";
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
};
// create the store with the actions and the state(combines them so you can import them together in other files and use them as one)
export const useNameStore = create<State & Action>((set) => ({
  name: "",
  updateName: (name: string) => set(() => ({ name: name })),
  colors: [],
  updateColors: (colors: Color[]) => set(() => ({ colors: colors })),
  state: false,
  updateState: (state: boolean) => set(() => ({ state: state })),
}));
