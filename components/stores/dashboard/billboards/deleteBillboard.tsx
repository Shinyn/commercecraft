import axios, { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useBillboards } from '@/components/stores/dashboard/billboards/zustand/zustandstate';
import { useParams } from 'next/navigation';

export function DeleteBillboard(params: { itemId: string }) {
  const reFetchBillboards = useBillboards((state) => state.reFetchBillboards);
  const { storeID } = useParams();
  return (
    <div
      className="hover:cursor-pointer w-full p-2"
      onClick={async (e) => {
        axios
          .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/billboards/${params.itemId}`)
          .then(function (response) {
            toast.success('Billboard deleted successfully');
            reFetchBillboards(Array.isArray(storeID) ? storeID.toString() : storeID);
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
