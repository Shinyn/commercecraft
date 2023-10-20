"use client";
import { useCategories } from "@/components/stores/dashboard/categories/zustand/zustandstate";
import { DataTable } from "@/components/data-table";
import { DashboardPopover } from "@/components/DashboardPopover";
import CategoryForm from "@/components/stores/dashboard/categories/categoryform";
import { columns } from "@/components/stores/dashboard/categories/columns";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { APIList } from "@/components/stores/dashboard/api-list/APIList";
import { toast } from "react-hot-toast";

export default function Page() {
  const categories = useCategories((state) => state.categories);
  const updateCategories = useCategories((state) => state.updateCategories);
  const updateState = useCategories((state) => state.updateState);
  const params = useParams();
  const section = "categories";

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
        toast.error(error.response.data);
      });
  }, []);

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
