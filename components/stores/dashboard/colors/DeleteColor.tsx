import axios from 'axios';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useColors } from '@/components/stores/dashboard/colors/zustand/zustandstate';

export function DeleteColor(params: { itemName: string }) {
  const { storeID } = useParams();
  const reFetchColors = useColors((state) => state.reFetchColors);

  return (
    <div
      className="hover:cursor-pointer w-full p-2"
      onClick={async (e) => {
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/colors/${params.itemName}`
          )
          .then(function (response) {
            toast.success('Color deleted successfully');
            reFetchColors(
              Array.isArray(storeID) ? storeID.toString() : storeID
            );
            return response.data;
          })
          .catch(function (error) {
            toast.error(error.response.data);
          });
      }}
    >
      Delete
    </div>
  );
}
