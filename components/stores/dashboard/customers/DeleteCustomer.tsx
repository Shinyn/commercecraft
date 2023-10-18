import axios, { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { useCustomers } from './zustand/zustandstate';
export function DeleteCustomer(params: { itemId: string }) {
  const { storeID } = useParams();
  const reFetchCustomers = useCustomers((state) => state.reFetchCustomers);


  return (
    <div
      className="w-full"
      onClick={async (e) => {
        axios
          .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/customers/${params.itemId}`)
          .then(function (response) {
            toast.success('Customer deleted successfully');
            reFetchCustomers(Array.isArray(storeID) ? storeID.toString() : storeID)
            return response;
          })
          .catch(function (error) {
            if (isAxiosError(error)) {
              return error.message;
            }
          });
      }}
    >
      Delete
    </div>
  );
}
