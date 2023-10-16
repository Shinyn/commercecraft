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
        <h1 className="text-3xl">Följesedel:</h1>
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
      <div>
        <h1 className="text-xl">Kundinformation:</h1>
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
          "flex flex-row justify-between p-3 border-4 border-black absolute bottom-0 w-full"
        }
      >
        <div>
          <h1 className="text-2xl font-bold m-1">Pris:</h1>
          <p className="font-bold m-1">Moms:</p>
          <div>
            <span className="font-bold m-1">Total:</span>
            <span>{order_total} SEK</span>
          </div>

          <p className="italic">Varav Frakt: 50kr </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen border-x-2 border-black">
      <div>
        <div className="border-4 border-black flex flex-row justify-around p-9">
          {loaded ? (
            <>
              <OrdersDiv orders={orders} />
              <CustomersDiv customers={customers} />{" "}
            </>
          ) : (
            "Loading"
          )}
        </div>
        <div className="border-black p-1  ">
          <div>
            {loaded ? (
              <>
                {order_items.map((item: any) => (
                  <div
                    key={item.id}
                    className={
                      "flex flex-row text-l  w-full border-b border-black justify-between"
                    }
                  >
                    <p className={"p-1"}>{item.title} </p>
                    <p className={"p-1"}>x {item.amount}</p>
                    <p className="p-1">{item.price} SEK</p>
                  </div>
                ))}
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
