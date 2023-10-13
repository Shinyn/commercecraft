import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNameStore } from "./zustand/zustandstate";
import { useParams } from "next/navigation";

//Form for adding a new category
export default function EditSizeForm(ID: string | undefined) {
  const params = useParams();
  const name = useNameStore((state) => state.name);
  const updateName = useNameStore((state) => state.updateName);

  function onSubmitting(e: any) {
    e.preventDefault();
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/sizes`,
        {
          id: ID,
          title: name,
        }
      )
      .then(function (response) {
        window.location.reload();
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Render the form
  return (
    <form onSubmit={(e) => onSubmitting(e)}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        onChange={(e) => updateName(e.target.value)}
      />
      <Button>Submit</Button>
    </form>
  );
}
