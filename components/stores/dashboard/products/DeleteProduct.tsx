import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useProducts } from "./zustand/zustandstate";

const DeleteProduct = (params: { itemId: string }) => {
  const { storeID } = useParams();
  const reFetchProducts = useProducts((state) => state.reFetchProducts);

  return (
    <>
      <div
        className="hover:cursor-pointer w-full p-2"
        onClick={async (e) => {
          axios
            .delete(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/products/${params.itemId}`
            )
            .then((res) => {
              toast.success('Product deleted');
              reFetchProducts(Array.isArray(storeID) ? storeID.toString() : storeID);
              return res.data;
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Continue
      </div>
    </>
  );
};

export default DeleteProduct;
