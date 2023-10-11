import axios, { isAxiosError } from "axios"
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteCategory(params: { itemId: string }) {
  const {storeID}= useParams()
  return (
    <div onClick={async (e) => {
        axios
        .delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/categories/${params.itemId}`
        )
        .then(function (response) {
            toast.success("Category deleted successfully");
          window.location.reload();
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    }>
      Delete
    </div>
  )

}