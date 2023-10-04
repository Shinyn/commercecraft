"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNameStore } from "./zustand/zustandstate";

//Form for adding a new category
export default function EditCategoryForm(ID: string | undefined) {
  const name = useNameStore((state) => state.name);
  const updateName = useNameStore((state) => state.updateName);

  function onSubmitting(e: any) {
    e.preventDefault();
    axios
      .patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
        id: ID,
        title: name,
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
