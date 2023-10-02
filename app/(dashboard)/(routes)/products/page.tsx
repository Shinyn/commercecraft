// Produkt fliken på dashboarden

import {DataTable} from "../../../../components/data-table"
import { columns } from "../../../../components/route-components/dasboard/products/columns"
import { Product } from "../../../../components/route-components/dasboard/products/products"


//Contains fetch to GET alla products from api/products

// 'use client'

// import axios from 'axios'
// import { create } from 'zustand';

// type State = {
//     name: string,
//     items:Map<string, string>;
//   }
  
//   type Action = {
//     updateName: (name: State['name']) => void
//     updateItems: (items: State['items']) => void
//   }

//   const useItemStore = create<State & Action>((set) => ({
//     name: '',
//     updateName: (name: string) => set(() => ({ name: name })),
//     items: new Map<string, string>(),
//     updateItems: (items: Map<string, string>) => set(() => ({ items: items }))
//   }))



  

// export default function Page() {
//     const Itemname = useItemStore((state) => state.name)
//     const updateName = useItemStore((state) => state.updateName)
//     const items = useItemStore((state) => state.items)
//     const updateItems = useItemStore((state) => state.updateItems)
//     const itemsitr = items.entries()

//     function getProducts(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
//         e.preventDefault()
//         console.log('button clicked')
//         axios.get('/api/products', {})
//             .then(function (response) {
//                 console.log(response);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }

//     function getCategories(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
//         e.preventDefault()
//         console.log('button clicked')
//         axios.get('/api/categories', {})
//             .then(function (response) {
//                 response.data.forEach((item: { id: string; name: string; }) => {
//                     items.set(item.id, item.name)
//                 });
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }

//     function postCategory(e:React.FormEvent<HTMLFormElement>) {
//         e.preventDefault()
//         console.log('button clicked')
//         axios.post('/api/categories', {
//             name: Itemname
//     })
//             .then(function (response) {
//                 console.log(response);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }


  

//     return (
//         <div>
//             <h1>Products</h1>
//             <button onClick={getCategories}>Get Categories</button>
//             <form onSubmit={postCategory}>
//                 <label>New Category</label>
//                 <input type="text" name="name" value = {Itemname} onChange={(e) => updateName(e.currentTarget.value)}/>
//                 <button>Create</button>
//             </form>

//         {Array.from(itemsitr).map(([key, value]) => (
//                 <h2 key={key}>{value}</h2>
//         ))}


//         </div>
//     )
// }


async function getData(): Promise<Product[]> {
    // Fetch data from your API here.
    return [
    //   {
    //     id: "728ed52f",
    //     title: "Milk",
    //     description: "bla bla bla",
    //     price: 100,
    //   },
      // ...
    ]
  }

export default async function Page() {

const data = await getData()

    return (
        <div className={"m-9"} >
            <div className={"flex flex-row justify-between"}>
                <h1 className=" text-5xl ">Products</h1>
                <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Add Product
                </button>
            </div>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}