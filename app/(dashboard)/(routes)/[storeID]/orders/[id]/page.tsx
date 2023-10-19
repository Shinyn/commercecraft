"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "@/components/stores/dashboard/orders/order";

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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function OrdersDiv({ orders }: any) {
    const { order_number, order_date, order_status, order_total } = orders;
    return (
      <div>
        <h1 className="text-3xl">Delivery note:</h1>
        <p className="font-bold">Order Number: {order_number}</p>
        <p className="">Order Total Price: {order_total} SEK</p>
        <p className="">Order Date: {order_date}</p>
      </div>
    );
  }
  function CustomersDiv({ customers }: any) {
    const { firstName, lastName, e_mail, phone, street, city, zipCode } =
      customers;
    return (
      <div className="">
        <h1 className="text-xl">Customer Information:</h1>
        <p className="font-bold">{firstName + " " + lastName}</p>
        <p className="">{e_mail}</p>
        <p className=""> {phone}</p>
        <p className="font-bold">Adress:</p>
        <p className="">{street}</p>
        <p className="">
          {city} {zipCode}
        </p>
      </div>
    );
  }

  function BottomDiv({ orders }: any) {
    const { order_total } = orders;
    return (
      <div
        className={
          "flex flex-col justify-between border-t p-2 border-black absolute bottom-0 w-full"
        }
      >
        <div className="flex flex-row justify-between border-b-2 border-black">
          <div className="flex flex-col">
            <span className="font-bold m-1">VAT:</span>{" "}
            <span className="m-1">{(order_total - 50) * 0.12} SEK</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold m-1">Price excl. VAT:</span>{" "}
            <span className="m-1">{(order_total - 50) * 0.88} SEK</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold m-1">Delivery fee:</span>{" "}
            <span className="m-1"> 50 SEK</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold m-1 text-xl underline">
              Total Price incl. VAT:
            </span>
            <span className="m-1 font-bold text-xl">{order_total} SEK</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-center">Thank you for shopping with us!</p>
          <p className="text-center">
            If you have any questions, please contact us at:
          </p>
          <p className="text-center"></p>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="font-bold text-xl">Kontaktinformation:</h2>{" "}
              <p className="underline">Hakim Livs</p>
              <p>Tomtebodavägen 3A </p>
              <p>171 65 Solna</p>
            </div>
            <div>
              <div className="mt-8">
                <p className="m-2"> Mailadress: info@hakimlivs.se</p>
              </div>
              <div>
                <p className="m-2">Telefon: 073-777 777 7</p>
              </div>
            </div>{" "}
            <div className="mt-8">
              <p>Swish to: 073-777 777 7</p>
              <p>Or payment at delivery</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                          {item.price / item.amount} SEK
                        </td>
                        <td className="py-2 px-4">x{item.amount}</td>
                        <td className="py-2 px-4">{item.price} SEK</td>
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
