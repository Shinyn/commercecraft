"use client";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { columns } from "@/components/stores/dashboard/customers/columns";
import { DataTable } from "@/components/data-table";
import { useCustomers } from "@/components/stores/dashboard/customers/zustand/zustandstate";
import { APIList } from "@/components/stores/dashboard/api-list/APIList";
import { toast } from "react-hot-toast";

export default function Page() {
  const customers = useCustomers((state) => state.customers);
  const updateCustomers = useCustomers((state) => state.updateCustomers);
  const params = useParams();
  const section = "customers";

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/customers`,
        {}
      )
      .then(function (response) {
        updateCustomers(response.data);
      })
      .catch(function (error) {
        toast.error(error.response.data);
      });
  }, []);

  return (
    <div className={"flex flex-col"}>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={customers} />
      </div>

      <div className="container mx-auto py-10">
        <APIList section={section} />
      </div>
    </div>
  );
}
