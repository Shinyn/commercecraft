"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Store } from "./stores";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Store-name must be atleast 2 characters long" })
    .max(250, { message: "Store-name must be less than 250 characters" })
    .nonempty({ message: "Store-name must not be empty" }),
});

//Form for adding a new store

export default function EditStoreForm(store: Store) {
  const { userId } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: store.title,
    },
  });

  function onSubmitting() {
    axios
      .patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores`, {
        id: store.id,
        user_id: userId,
        title: form.getValues("title"),
      })
      .then(function (response) {
        toast.success("Store updated successfully");
        setInterval(() => {
          window.location.reload();
        }, 3000);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Render the form
  return (
    <Form {...form}>
      <form
        className="flex flex-col p-0"
        onSubmit={form.handleSubmit(onSubmitting)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="py-4">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Store name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
