import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const DeleteOrder = (orderId: string) => {
  const storeID = useParams();
  return (
    <>
      <div
        className="hover:cursor-pointer w-full"
        onClick={async (e) => {
          axios
            .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/orders/${orderId}`)
            .then((res) => {
              toast.success('Order deleted');
              setTimeout(() => {
                window.location.reload();
              }, 1500);
              return res.data;
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Delete
      </div>
    </>
  );
};

export default DeleteOrder;
