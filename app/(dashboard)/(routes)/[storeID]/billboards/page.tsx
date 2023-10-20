"use client";
import { DashboardPopover } from "@/components/DashboardPopover";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/stores/dashboard/billboards/columns";
import { useEffect } from "react";
import { PostForm } from "@/components/stores/dashboard/billboards/PostForm";
import axios from "axios";
import { useBillboards } from "@/components/stores/dashboard/billboards/zustand/zustandstate";
import { useParams } from "next/navigation";
import { APIList } from "@/components/stores/dashboard/api-list/APIList";
import { toast } from "react-hot-toast";

export default function Page() {
  //states for keeping track of billboards in dashboard front
  const billboards = useBillboards((state) => state.billboards);
  const updateBillboards = useBillboards((state) => state.updateBillboards);
  const params = useParams();

  const section = "billboards";

  useEffect(() => {
    axios
      .get(`/api/${params.storeID}/billboards`, {})
      .then(function (response) {
        updateBillboards(response.data);
      })
      .catch(function (error) {
        toast.error(error.response.data);
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
        <div className="container mx-auto py-10">
          <APIList section={section} />
        </div>
      </div>
    </div>
  );
}
