'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Order } from '@/components/stores/dashboard/orders/order';

const OrderPage = () => {
  const params = useParams();
  const [orders, setOrders] = useState({});
  const [customers, setCustomers] = useState({});
  const [order_items, setOrder_items] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(`/api/${params.storeID}/orders/${params.id}`);
        const customersResponse = await axios.get(`/api/${params.storeID}/customers/${ordersResponse.data.customerId}`);
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
    const { firstName, lastName, e_mail, phone, street, city, zipCode } = customers;
    return (
      <div className="">
        <h1 className="text-xl">Customer Information:</h1>
        <p className="font-bold">{firstName + ' ' + lastName}</p>
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
      <div className={'flex flex-row justify-between border-t border-black absolute bottom-0 w-full'}>
        <div>
          <h1 className="text-2xl font-bold m-1">Pris:</h1>
          <p className="font-bold m-1">Moms:</p>
          <div>
            <span className="font-bold m-1">Total:</span>
            <span>{order_total} SEK</span>
          </div>

          <p className="italic pl-1"> Varav Frakt: 50kr </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-[1400px] border border-black">
      <div>
        <div className="border-b border-black flex flex-row justify-around p-9">
          {loaded ? (
            <>
              <OrdersDiv orders={orders} />
              <CustomersDiv customers={customers} />{' '}
            </>
          ) : (
            'Loading'
          )}
        </div>
        <div className="border-black  ">
          <div>
            {loaded ? (
              <>
                <table className="w-full">
                  <thead className="bg-green-200">
                    <tr className="text-left">
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Amount</th>
                      <th className="py-2 px-4">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order_items.map((item: any, index) => (
                      <tr
                        key={item.id}
                        className={`border-b border-black ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                      >
                        <td className="py-2 px-4">{item.title}</td>
                        <td className="py-2 px-4">x{item.amount}</td>
                        <td className="py-2 px-4">{item.price} SEK</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              'Loading'
            )}
          </div>
        </div>
        <BottomDiv orders={orders} />
      </div>
    </div>
  );
};

export default OrderPage;
