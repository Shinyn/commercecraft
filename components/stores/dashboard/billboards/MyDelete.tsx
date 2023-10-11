import axios, { isAxiosError } from "axios"
import toast from "react-hot-toast";
import { BillboardState } from "@/components/dashboard/billboards/state";


export function MyDelete(params: { itemId: string }) {
  const reFetchBillboards = BillboardState((state) => state.reFetchBillboards);
  return (
    <div onClick={async (e) => {
      axios.delete(`/api/billboards/${params.itemId}`)
        .then(function (response) {
          toast.success("Billboard deleted successfully");
          reFetchBillboards()
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