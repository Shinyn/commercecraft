import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useOrders } from "./zustand/ordersState";

const DeleteOrder = (orderId: string) => {
  const { storeID } = useParams();
  const reFetchCompleteOrders = useOrders((state) => state.reFetchCompleteOrders);

  return (
    <>
      <div
        className="hover:cursor-pointer w-full p-2"
        onClick={async (e) => {
          axios
            .delete(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/orders/${params.orderId}`
            )
            .then((res) => {
              toast.success('Order deleted');
              reFetchCompleteOrders(Array.isArray(storeID) ? storeID.toString() : storeID);
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
