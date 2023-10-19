import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';

export function MyDelete(params: { ID: string | undefined }) {
  const { userId } = useAuth();
  return (
    <div
      className="hover:cursor-pointer p-2 w-full"
      onClick={(e) => {
        const response = axios
          .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores/${userId}/${params.ID}`, {})
          .then(function (response) {
            toast.success('Store added successfully');
            setInterval(() => {
              window.location.reload();
            }, 3000);
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
