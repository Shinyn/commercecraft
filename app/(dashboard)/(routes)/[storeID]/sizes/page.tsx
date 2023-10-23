"use client";
//Page displays a datatable of the databasecontents for the resource and has a popover form for resource creation.
import { useSizes } from "@/components/stores/dashboard/sizes/zustand/zustandstate";
import { DataTable } from "@/components/data-table";
import { DashboardPopover } from "@/components/DashboardPopover";

import SizeForm from "@/components/stores/dashboard/sizes/SizeForm";
import { columns } from "@/components/stores/dashboard/sizes/columns";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { APIList } from "@/components/stores/dashboard/api-list/APIList";

export default function Page() {
  //State for the sizes
  const sizes = useSizes((state) => state.sizes);
  const updateSizes = useSizes((state) => state.updateSizes);
  const updateState = useSizes((state) => state.updateState);
  const params = useParams();
  const section = "sizes";

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

  return (
    <div className={"flex flex-col"}>
      <DashboardPopover>
        <SizeForm />
      </DashboardPopover>

      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={sizes} />
        </div>

        <div className="container mx-auto py-10">
          <APIList section={section} />
        </div>
      </div>
    </div>
  );
}
