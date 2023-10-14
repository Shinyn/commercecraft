"use client";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { columns } from "@/components/stores/dashboard/customers/columns";
import { DashboardPopover } from "@/components/DashboardPopover";
import { DataTable } from "@/components/data-table";
export default function Page() {
  //states for keeping track of billboards in dashboard front
  const params = useParams();

  //Sample data until state is implemented
  //TODO:Add state for holding customers
  const customers = [
    {
      id: "12323543253",
      storeId: "298f4164-0d99-4b2d-a054-4fe4fac7e498",
      firstname: "John",
      lastname: "Doe",
      street: "BabyDollRoad",
      zipCode: "11111",
      city: "Barbietown",
      email: "john.doe@theuniverse.com",
      phone: "1234567890",
    },
    {
      id: "12323543253",
      storeId: "298f4164-0d99-4b2d-a054-4fe4fac7e498",
      firstname: "John",
      lastname: "Doe",
      street: "BabyDollRoad",
      zipCode: "11111",
      city: "Barbietown",
      email: "john.doe@theuniverse.com",
      phone: "1234567890",
    },
    {
      id: "12323543253",
      storeId: "298f4164-0d99-4b2d-a054-4fe4fac7e498",
      firstname: "John",
      lastname: "Doe",
      street: "BabyDollRoad",
      zipCode: "11111",
      city: "Barbietown",
      email: "john.doe@theuniverse.com",
      phone: "1234567890",
    },
  ];

  useEffect(() => {
    axios
      .get(`/api/${params.storeID}/customers`, {})
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className={"flex flex-col"}>
      <DashboardPopover>Not implemented yet</DashboardPopover>
      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={customers} />
        </div>
      </div>
    </div>
  );
}
