"use client";
//Page displays a datatable of the databasecontents for the resource and has a popover form for resource creation.

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
  const billboards = useBillboards((state) => state.billboards);
  const updateBillboards = useBillboards((state) => state.updateBillboards);
  const params = useParams();
  const section = 'billboards';

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
    <div className="max-w-[95%]">
      <DashboardPopover>
        <PostForm />
      </DashboardPopover>
      <div>
        <div className="py-10">
          <DataTable columns={columns} data={billboards} />
        </div>
        <div className="py-10">
          <APIList section={section} />
        </div>
      </div>
    </div>
  );
}
