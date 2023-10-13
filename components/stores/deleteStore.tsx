import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export function MyDelete(params: { ID: string | undefined }) {
  const { userId } = useAuth();
  return (
    <div
      onClick={(e) => {
        const response = axios
          .delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores/${userId}/${params.ID}`,
            {}
          )
          .then(function (response) {
            window.location.reload();
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }}
    >
      Delete
    </div>
  );
}
