"use client";
import { useNameStore } from "@/components/stores/dashboard/colors/zustand/zustandstate";
import { DataTable } from "@/components/data-table";
import { DashboardPopover } from "@/components/DashboardPopover";

import ColorForm from "@/components/stores/dashboard/colors/ColorForm";
import { columns } from "@/components/stores/dashboard/colors/columns";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { APIList } from "@/components/stores/dashboard/api-list/APIList";

export default function Page() {
  //State for the colors
  const colors = useNameStore((state) => state.colors);
  const updateColors = useNameStore((state) => state.updateColors);
  const state = useNameStore((state) => state.state);
  const updateState = useNameStore((state) => state.updateState);
  const params = useParams();
  const section = "colors";

  //Get the colors from the database
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
        console.log(error);
      });
  }, []);

  //Render the page, pop up for adding a color and the table with the colors
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
