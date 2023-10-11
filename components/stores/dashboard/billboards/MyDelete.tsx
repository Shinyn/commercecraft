import axios, { isAxiosError } from "axios"
import toast from "react-hot-toast";
import { BillboardState } from "@/components/stores/dashboard/billboards/state";
import {storeState} from "@/components/stores/storeState"
import { useParams } from "next/navigation";

export function MyDelete(params: { itemId: string }) {
  const reFetchBillboards = BillboardState((state) => state.reFetchBillboards);
  const {storeID}= useParams()
  return (
    <div onClick={async (e) => {
      console.log(`/api/${storeID}/billboards/${params.itemId}`)
      axios.delete(`/api/${storeID}/billboards/${params.itemId}`)
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