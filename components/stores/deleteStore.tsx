import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { storeState } from "@/components/stores/storeState";

export function DeleteStore(params: { storeId: string | undefined }) {
  const reFetchStores = storeState((state) => state.refetchStore);
  const { userId } = useAuth();
  return (
    <div
      className="hover:cursor-pointer p-2 w-full"
      onClick={(e) => {
        const response = axios
          .delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores/${userId}/${params.storeId}`,
            {}
          )
          .then(function (response) {
            toast.success("Store deleted successfully");
            reFetchStores(userId?.toString() as string);
            // window.location.reload();
            return;
          })
          .catch(function (error) {
            toast.error(error.response);
            return;
          });
      }}
    >
      Delete
    </div>
  );
}
