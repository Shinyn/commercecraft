import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

//Form for adding a new category
export default function EditStoreForm(ID: string | undefined, name: string) {
  const { userId } = useAuth();
  const [title, setTitle] = useState(name);

  function onSubmitting(e: any) {
    e.preventDefault();
    axios
      .patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores`, {
        id: ID,
        user_id: userId,
        title: title,
      })
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
      <label htmlFor="title">Name</label>
      <input
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button>Submit</Button>
    </form>
  );
}
