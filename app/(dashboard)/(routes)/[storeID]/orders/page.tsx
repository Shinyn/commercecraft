"use client";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Page() {
  //states for keeping track of billboards in dashboard front
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/${params.storeID}/orders`, {})
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className={"flex flex-col"}>
      <div>
        <div className="container mx-auto py-10">
         Order-page
        </div>
      </div>
    </div>
  );
}
