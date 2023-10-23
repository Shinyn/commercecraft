//Page displays a datatable of the databasecontents for the resource and has a popover form for resource creation.

"use client";
import { useColors } from "@/components/stores/dashboard/colors/zustand/zustandstate";
import { DataTable } from "@/components/data-table";
import { DashboardPopover } from "@/components/DashboardPopover";

import ColorForm from "@/components/stores/dashboard/colors/ColorForm";
import { columns } from "@/components/stores/dashboard/colors/columns";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { APIList } from "@/components/stores/dashboard/api-list/APIList";
import { toast } from "react-hot-toast";

export default function Page() {
  const colors = useColors((state) => state.colors);
  const updateColors = useColors((state) => state.updateColors);
  const updateState = useColors((state) => state.updateState);
  const params = useParams();
  const section = "colors";

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/colors`,
        {}
      )
      .then(function (response) {
        updateColors(response.data);
        updateState(true);
      })
      .catch(function (error) {
        toast.error(error.response.data);
      });
  }, []);

  return (
    <div className={"flex flex-col"}>
      <DashboardPopover>
        <ColorForm />
      </DashboardPopover>

      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={colors} />
        </div>
        <div className="container mx-auto py-10">
          <APIList section={section} />
        </div>
      </div>
    </div>
  );
}
