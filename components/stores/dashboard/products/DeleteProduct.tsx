import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const DeleteProduct = (params: { itemId: string }) => {
  const storeID = useParams();
  return (
    <>
      <div
        onClick={async (e) => {
          axios
            .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/products/${params.itemId}`)
            .then((res) => {
              toast.success('Product deleted');
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

export default DeleteProduct;
