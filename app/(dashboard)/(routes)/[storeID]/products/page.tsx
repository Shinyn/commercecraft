"use client";
//Page displays a datatable of the databasecontents for the resource and has a popover form for resource creation.
import { useProducts } from "@/components/stores/dashboard/products/zustand/zustandstate";
import { DataTable } from "@/components/data-table";
import { DashboardPopover } from "@/components/DashboardPopover";
import ProductForm from "@/components/stores/dashboard/products/productform";
import { columns } from "@/components/stores/dashboard/products/columns";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { APIList } from "@/components/stores/dashboard/api-list/APIList";
import { toast } from "react-hot-toast";

export default function Page() {
  // State för produkter
  const products = useProducts((state) => state.products);
  const updateProducts = useProducts((state) => state.updateProducts);

  const params = useParams();
  const section = "products";

  // Hämta produkterna från databasen
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/products/${params.id}`,
        {}
      )
      .then(function (response) {
        updateProducts(response.data);
      })
      .catch(function (error) {
        toast.error(error.response.data);
      });
  }, []);

  // Rendera sidan, popup för att lägga till en produkt och tabellen med produkter
  return (
    <>
      <DashboardPopover>
        <ProductForm />
      </DashboardPopover>
      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={products} />
        </div>

        <div className="container mx-auto py-10">
          <APIList section={section} />
        </div>
      </div>
    </>
  );
}
