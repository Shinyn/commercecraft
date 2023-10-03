import {create} from 'zustand'
// Zustand store to keep track of the items in the category dropdown
type State = {
    name: string,
    categories: Array<string>,
    state: boolean

  }
  
  type Action = {
    updateName: (name: State['name']) => void
    updateCategories: (categories: State['categories']) => void
    updateState: (state: State['state']) => void

  }

  export const useNameStore = create<State & Action>((set) => ({
    name: '',
    updateName: (name: string) => set(() => ({ name: name })),
    categories: Array<string>(),
    updateCategories: (categories: Array<string>) => set(() => ({ categories: categories })),
    state: false,
    updateState: (state: boolean) => set(() => ({ state: state })),


  }))