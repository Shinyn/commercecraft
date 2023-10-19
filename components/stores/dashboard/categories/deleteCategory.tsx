import axios from 'axios';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCategories } from '@/components/stores/dashboard/categories/zustand/zustandstate';

export function DeleteCategory(params: { itemId: string }) {
  const reFetchCategories = useCategories((state) => state.reFetchCategories);
  const { storeID } = useParams();
  return (
    <div
      className="hover:cursor-pointer w-full p-2"
      onClick={async (e) => {
        axios
          .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/categories/${params.itemId}`)
          .then(function (response) {
            toast.success('Category deleted successfully');
            reFetchCategories(Array.isArray(storeID) ? storeID.toString() : storeID);
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }}
    >
      Delete
    </div>
  );
}
