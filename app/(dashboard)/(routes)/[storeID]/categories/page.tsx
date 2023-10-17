"use client";
import { useNameStore } from "@/components/stores/dashboard/categories/zustand/zustandstate";
import { DataTable } from "@/components/data-table";
import { DashboardPopover } from "@/components/DashboardPopover";

import CategoryForm from "@/components/stores/dashboard/categories/categoryform";
import { columns } from "@/components/stores/dashboard/categories/columns";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { APIList } from "@/components/stores/dashboard/api-list/APIList";

export default function Page() {
  //State for the categories
  const categories = useNameStore((state) => state.categories);
  const updateCategories = useNameStore((state) => state.updateCategories);
  const state = useNameStore((state) => state.state);
  const updateState = useNameStore((state) => state.updateState);
  const params = useParams();
  const section = "categories";

  //Get the categories from the database
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/categories`,
        {}
      )
      .then(function (response) {
        updateCategories(response.data);
        updateState(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //Render the page, pop up for adding a category and the table with the categories
  return (
    <div className={"flex flex-col"}>
      <DashboardPopover>
        <CategoryForm />
      </DashboardPopover>

      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={categories} />
        </div>

        <div className="container mx-auto py-10">
          <APIList section={section} />
        </div>
      </div>
    </div>
  );
}
