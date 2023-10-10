'use client'
import { DashboardPopover } from "@/components/DashboardPopover"
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/dashboard/billboards/columns";
import { useEffect } from "react";
import { PostForm } from "@/components/dashboard/billboards/PostForm"
import { BillboardState } from "@/components/dashboard/billboards/state";
import { Toaster } from "react-hot-toast";

export default function Page() {
  //states for keeping track of billboards in dashboard front
  const billboards = BillboardState((state) => state.billboards);
  const reFetchBillboards = BillboardState((state) => state.reFetchBillboards);


  useEffect(() => {
    reFetchBillboards()
  }, []);
  return (
    <>
      <DashboardPopover>
        <PostForm />
      </DashboardPopover>
      <Toaster />
      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={billboards} />
        </div>
      </div>
    </>
  );
}