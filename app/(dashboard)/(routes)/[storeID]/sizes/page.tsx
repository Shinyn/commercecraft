"use client";
import { useNameStore } from "@/components/stores/dashboard/sizes/zustand/zustandstate";
import { DataTable } from "@/components/data-table";
import { DashboardPopover } from "@/components/DashboardPopover";

import SizeForm from "@/components/stores/dashboard/sizes/SizeForm";
import { columns } from "@/components/stores/dashboard/sizes/columns";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  //State for the sizes
  const sizes = useNameStore((state) => state.sizes);
  const updateSizes = useNameStore((state) => state.updateSizes);
  const state = useNameStore((state) => state.state);
  const updateState = useNameStore((state) => state.updateState);
  const params = useParams();

  //Get the categories from the database
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/sizes`,
        {}
      )
      .then(function (response) {
        updateSizes(response.data);
        updateState(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //Render the page, pop up for adding a size and the table with the categories
  return (
    <div className={"flex flex-col"}>
      <DashboardPopover>
        <SizeForm />
      </DashboardPopover>

      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={sizes} />
        </div>
      </div>
    </div>
  );
}
