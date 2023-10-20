import axios from 'axios';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export function DeleteSize(params: { itemName: string }) {
  const { storeID } = useParams();
  return (
    <div
      className="hover:cursor-pointer w-full p-2"
      onClick={async (e) => {
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/sizes/${params.itemName}`
          )
          .then(function (response) {
            toast.success('Size deleted successfully');
            window.location.reload();
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
