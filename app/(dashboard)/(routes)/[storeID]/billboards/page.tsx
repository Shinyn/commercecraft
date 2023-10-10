"use client";
import { DashboardPopover } from "@/components/DashboardPopover";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/stores/dashboard/billboards/columns";
import { useEffect } from "react";
import { PostForm } from "@/components/stores/dashboard/billboards/PostForm";
import axios from "axios";
import { BillboardState } from "@/components/stores/dashboard/billboards/state";

export default function Page() {
  //states for keeping track of billboards in dashboard front
  const billboards = BillboardState((state) => state.billboards);
  const updateBillboards = BillboardState((state) => state.updateBillboards);

  useEffect(() => {
    axios
      .get(`/api/billboards`, {})
      .then(function (response) {
        console.log(response.data);
        updateBillboards(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className={"flex flex-col"}>
      <DashboardPopover>
        <PostForm />
      </DashboardPopover>
      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={billboards} />
        </div>
      </div>
    </div>
  );
}
