import axios, { isAxiosError } from "axios"
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

export function DeleteCustomer(params: { itemId: string }) {
  const {storeID}= useParams()
  return (
    <div onClick={async (e) => {
      axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/customers/${params.itemId}`)
        .then(function (response) {
          toast.success("Customer deleted successfully");
          setInterval(() => {
            window.location.reload();
        }, 3000);
          return response
        })
        .catch(function (error) {
          if (isAxiosError(error)) {
            return error.message;
          }
        });
    }
    }>
      Delete
    </div>
  )
}