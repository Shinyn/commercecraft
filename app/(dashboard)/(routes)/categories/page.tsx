
'use client'
 import { useNameStore } from '@/components/route-components/dasboard/categories/zustand/zustandstate';
 import { DataTable } from '@/components/data-table';


 import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

 import CategoryForm from '@/components/route-components/dasboard/categories/categoryform';
 import { columns } from '@/components/route-components/dasboard/categories/columns';
import axios from 'axios'
import { useEffect} from 'react'






export default function Page() {
    const categories = useNameStore((state) => state.categories)
    const updateCategories = useNameStore((state) => state.updateCategories)
    const state = useNameStore((state) => state.state)
    const updateState = useNameStore((state) => state.updateState)


       
      

    useEffect(() => {
        axios.get('/api/categories', {})
            .then(function (response) {
                updateCategories(response.data)
                    updateState(true)
            
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])


    return (
        <>
            <div className={"flex flex-row justify-end "}>
                <div className={"text-center text-2xl m-9 rounded bg-blue-400 w-9"}>
                <Popover> 
                 <PopoverTrigger> + </PopoverTrigger>
                <PopoverContent><CategoryForm/></PopoverContent>
                </Popover>
                </div>
            </div>
        <div>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={categories} />
            </div>

        </div>
    </>
    )
}