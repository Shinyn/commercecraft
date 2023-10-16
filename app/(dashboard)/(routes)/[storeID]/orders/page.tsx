"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/stores/dashboard/orders/columns";
import { useOrders } from "@/components/stores/dashboard/orders/zustand/ordersState";
import { Order } from "@/components/stores/dashboard/orders/order";
import { APIList } from "@/components/stores/dashboard/api-list/APIList";

export default function Page() {
  //states for keeping track of billboards in dashboard front
  const params = useParams();
  const orders = useOrders((state) => state.orders);
  const updateOrders = useOrders((state) => state.updateOrders);
  const section = "orders";

  useEffect(() => {
    axios
      .get(`/api/${params.storeID}/orders/all`, {})
      .then(function (response) {
        const promises = response.data.map((order: any) => {
          if (order.customerId === "Not specified") return order;
          return axios
            .get(`/api/${params.storeID}/customers/${order.customerId}`, {})
            .then(function (res) {
              order.order_date = (
                order.order_date.split("T")[0] +
                " " +
                order.order_date.split("T")[1].split(".")[0]
              )
                .replace(/-/g, "/")
                .replace(" ", " at ");
              order.customerName = res.data.firstName + " " + res.data.lastName;
              order.customerEmail = res.data.e_mail;
              order.customerPhone = res.data.phone;
              order.customerstreet = res.data.street;
              order.customerCity = res.data.city;
              return order;
            })
            .catch(function (error) {
              console.log(error);
              return order;
            });
        });

        Promise.all(promises)
          .then((updatedOrders) => {
            const orderstogether: Order[] = [...orders, ...updatedOrders];
            updateOrders(orderstogether);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className={"flex flex-col"}>
      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={orders} />
        </div>

        <div className="container mx-auto py-10">
          <APIList section={section} />
        </div>
      </div>
    </div>
  );
}
