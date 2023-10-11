import axios, { isAxiosError } from "axios"
import toast from "react-hot-toast";
import { BillboardState } from "@/components/stores/dashboard/billboards/state";
import { useParams } from "next/navigation";

export function MyDelete(params: { itemId: string }) {
  const reFetchBillboards = BillboardState((state) => state.reFetchBillboards);
  const {storeID}= useParams()
  return (
    <div onClick={async (e) => {
      axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${storeID}/billboards/${params.itemId}`)
        .then(function (response) {
          toast.success("Billboard deleted successfully");
          reFetchBillboards(Array.isArray(storeID)?storeID.toString():storeID)
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