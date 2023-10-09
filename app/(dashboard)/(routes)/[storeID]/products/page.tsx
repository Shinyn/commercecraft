"use client";
import { useProductStore } from "@/components/stores/dashboard/products/zustand/zustandstate";
import { DataTable } from "@/components/data-table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ProductForm from "@/components/stores/dashboard/products/productform";
import { columns } from "@/components/stores/dashboard/products/columns";
import axios from "axios";
import { useEffect } from "react";

export default function Page() {
  // State för produkter
  const products = useProductStore((state) => state.products);
  const updateProducts = useProductStore((state) => state.updateProducts);

  // Hämta produkterna från databasen
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {})
      .then(function (response) {
        updateProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Rendera sidan, popup för att lägga till en produkt och tabellen med produkter
  return (
    <>
      <div className={"flex flex-row justify-end "}>
        <div className={"text-center text-2xl m-9 rounded bg-blue-400 w-9"}>
          <Popover>
            <PopoverTrigger>+</PopoverTrigger>
            <PopoverContent>
              <ProductForm />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={products} />
        </div>
      </div>
    </>
  );
}
