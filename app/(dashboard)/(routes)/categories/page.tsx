"use client";
import { useNameStore } from "@/components/dashboard/categories/zustand/zustandstate";
import { DataTable } from "@/components/data-table";
import {DashboardPopover} from  "@/components/DashboardPopover"

import CategoryForm from "@/components/dashboard/categories/categoryform";
import { columns } from "@/components/dashboard/categories/columns";
import axios from "axios";
import { useEffect } from "react";

export default function Page() {
  //State for the categories
  const categories = useNameStore((state) => state.categories);
  const updateCategories = useNameStore((state) => state.updateCategories);
  const state = useNameStore((state) => state.state);
  const updateState = useNameStore((state) => state.updateState);

  //Get the categories from the database
  useEffect(() => {
    axios
      .get("/api/categories", {})
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
    <>
    <DashboardPopover>
    <CategoryForm />
    </DashboardPopover>

      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={categories} />
        </div>
      </div>
    </>
  );
}
