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
    <main className="min-h-screen m-8 flex flex-col place-content-center items-center  w-full">
      <div className="flex justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
      <StoreForm />
      <DataTable columns={columns} data={store} />
    </main>
  );
}
