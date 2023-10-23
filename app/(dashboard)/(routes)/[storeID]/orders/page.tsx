//Page displays a datatable of the databasecontents for the resource.

'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/stores/dashboard/orders/columns';
import { useOrders } from '@/components/stores/dashboard/orders/zustand/ordersState';
import { APIList } from '@/components/stores/dashboard/api-list/APIList';

export default function Page() {
  //states for keeping track of billboards in dashboard front
  const { storeID } = useParams();
  const orders = useOrders((state) => state.orders);
  const section = 'orders';
  const reFetchCompleteOrders = useOrders((state) => state.reFetchCompleteOrders);

  useEffect(() => {
    reFetchCompleteOrders(Array.isArray(storeID) ? storeID.toString() : storeID);
  }, []);

  return (
    <div className={'flex flex-col'}>
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
