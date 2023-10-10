"use client";
import { useNameStore } from "@/components/stores/dashboard/categories/zustand/zustandstate";
import { DataTable } from "@/components/data-table";
import { DashboardPopover } from "@/components/DashboardPopover";

import CategoryForm from "@/components/stores/dashboard/categories/categoryform";
import { columns } from "@/components/stores/dashboard/categories/columns";
import axios from "axios";
import { useEffect } from "react";

export default function Page() {

  //Render the page, pop up for adding a category and the table with the categories
  return (
    <>


      <div>
        <div className="container mx-auto py-10">
          Hej du är i [storeID] Kul för dig!
        </div>
      </div>
    </>
  );
}