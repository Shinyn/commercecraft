"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EditStoreForm from "@/components/stores/editStoreNameForm";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Store } from "@/components/stores/stores";
import { FiSettings } from "react-icons/fi";

export function Settings() {
  const params = useParams();
  const [store, setStore] = useState<Store>(() => ({} as Store));
  const { userId } = useAuth();

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores/${userId}/${params.storeID}`,
        {}
      )
      .then(function (response) {
        setStore(response.data);

        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [userId, params.storeID]);

  if (!store) {
    return <div>Loading...</div>;
  } else
    return (
      <div className={"text-center text-2xl m-5 rounded bg-blue-400"}>
        <Popover>
          <PopoverTrigger>
            <FiSettings className="text-4xl hover:text-white" />
          </PopoverTrigger>
          <PopoverContent>
            Here you can edit your store-name:
            <EditStoreForm {...store} />
          </PopoverContent>
        </Popover>
      </div>
    );
}
