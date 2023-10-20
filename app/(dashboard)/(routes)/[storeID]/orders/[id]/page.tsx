"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "@/components/stores/dashboard/orders/order";
import OrdersDiv from "@/components/stores/dashboard/orders/id/OrdersDiv";
import CustomersDiv from "@/components/stores/dashboard/orders/id/CustomersDiv";
import BottomDiv from "@/components/stores/dashboard/orders/id/BottomDiv";
import { toast } from "react-hot-toast";

const OrderPage = () => {
  const params = useParams();
  const [orders, setOrders] = useState({});
  const [customers, setCustomers] = useState({});
  const [order_items, setOrder_items] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(
          `/api/${params.storeID}/orders/${params.id}`
        );
        const customersResponse = await axios.get(
          `/api/${params.storeID}/customers/${ordersResponse.data.customerId}`
        );
        const orderItemsResponse = await axios.get(
          `/api/${params.storeID}/order_items/${ordersResponse.data.order_number}`
        );

        setOrders(ordersResponse.data);
        setCustomers(customersResponse.data);
        setOrder_items(orderItemsResponse.data);
        setLoaded(true);
      } catch (error: any) {
        toast.error(error.response.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative print:h-[1390px] w-[1000px] border border-x-2 border-black h-screen">
      <div>
        <div className="border-b-2 border-black flex flex-row justify-around p-9">
          {loaded ? (
            <>
              <OrdersDiv orders={orders} />
              <CustomersDiv customers={customers} />{" "}
            </>
          ) : (
            "Loading"
          )}
        </div>
        <div className="border-black ">
          <div>
            {loaded ? (
              <>
                <table className="w-full">
                  <thead className="bg-green-200 border-x-1 border-b-2 border-black">
                    <tr className="text-left">
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Unitprice</th>
                      <th className="py-2 px-4">Amount</th>
                      <th className="py-2 px-4">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order_items.map((item: any, index) => (
                      <tr
                        key={item.id}
                        className={`border-b border-x-1 border-black ${
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                        }`}
                      >
                        <td className="py-2 px-4">{item.title}</td>
                        <td className="py-2 px-4">
                          {item.price !== undefined && item.price.includes(".")
                            ? (item.price / item.amount)
                                .toFixed(2)
                                .slice(0, -6) +
                              " " +
                              (item.price / item.amount).toFixed(2).slice(-6)
                            : null}{" "}
                          {item.price !== undefined && !item.price.includes(".")
                            ? (item.price / item.amount)
                                .toFixed(2)
                                .slice(0, -6) +
                              " " +
                              (item.price / item.amount)
                                .toFixed(2)
                                .slice(-6, -3) +
                              " " +
                              (item.price / item.amount).toFixed(2).slice(-3)
                            : null}
                          SEK
                        </td>
                        <td className="py-2 px-4">x {item.amount}</td>
                        <td className="py-2 px-4">
                          {item.price !== undefined && item.price.includes(".")
                            ? (item.price * 1).toFixed(2).slice(0, -6) +
                              " " +
                              (item.price * 1).toFixed(2).slice(-6)
                            : null}{" "}
                          {item.price !== undefined && !item.price.includes(".")
                            ? (item.price * 1).toFixed(2).slice(0, -6) +
                              " " +
                              (item.price * 1).toFixed(2).slice(-6, -3) +
                              " " +
                              (item.price * 1).toFixed(2).slice(-3)
                            : null}{" "}
                          SEK
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              "Loading"
            )}
          </div>
        </div>
        <BottomDiv orders={orders} />
      </div>
    </div>
  );
};

export default OrderPage;
