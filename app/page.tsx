"use client";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import StoreForm from "@/components/stores/newStoreForm";
import { columns } from "../components/stores/columns";
import { DataTable } from "@/components/data-table";
import { toast } from "react-hot-toast";
import { storeState } from "@/components/stores/storeState";

export default function Home() {
  const { userId } = useAuth();
  const store = storeState((state: any) => state.store);
  const updateStore = storeState((state: any) => state.updateStore);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores/${userId}`, {})
      .then(function (response) {
        updateStore(response.data);
        return;
      })
      .catch(function (error) {
        toast.error(error.response.data);
        return;
      });
  }, []);

  return (
    <main className="p-10 w-[90%] mx-auto">
      <div className="w-full flex flex-row justify-between mb-10">
        <h1 className="font-extrabold text-3xl">Commerce Craft</h1>
        <div className="w-fit">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      
      <StoreForm />
      <DataTable columns={columns} data={store} />
    </main>
  );
}
