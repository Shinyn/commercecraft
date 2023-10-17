'use client';
import { UserButton } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import StoreForm from '@/components/stores/newStoreForm';
import { columns } from '../components/stores/columns';
import { DataTable } from '@/components/data-table';

export default function Home() {
  const [stores, setStores] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores/${userId}`, {})
      .then(function (response) {
        console.log(response);
        setStores(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <main className="min-h-screen">
      <div className="flex justify-end m-8">
        <UserButton afterSignOutUrl="/" />
      </div>
      <StoreForm />
      <DataTable columns={columns} data={stores} />
    </main>
  );
}
