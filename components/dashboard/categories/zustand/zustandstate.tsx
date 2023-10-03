import {create} from 'zustand'
// Zustand store to keep track of the items in the category dropdown

// create a store:age with the state
type State = {
    name: string,
    categories: Array<string>,
    state: boolean

  }
  
  // create actions to the store (functions that will update the store)
  type Action = {
    updateName: (name: State['name']) => void
    updateCategories: (categories: State['categories']) => void
    updateState: (state: State['state']) => void

  }
// create the store with the actions and the state(combines them so you can import them together in other files and use them as one)
  export const useNameStore = create<State & Action>((set) => ({
    name: '',
    updateName: (name: string) => set(() => ({ name: name })),
    categories: Array<string>(),
    updateCategories: (categories: Array<string>) => set(() => ({ categories: categories })),
    state: false,
    updateState: (state: boolean) => set(() => ({ state: state })),


  }))