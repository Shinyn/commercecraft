import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useSizes } from "./zustand/zustandstate";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";

//Form for adding a new category
export default function SizeForm() {
  const params = useParams();
  const reFetchSizes = useSizes((state) => state.reFetchSizes);
  //Form validation
  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Unit must be atleast 1 characters long" })
      .max(50, { message: "Unit must be less than 50 characters long" })
      .nonempty({ message: "You must write a unit" }),
  });
  //Form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  //Submit function
  function onSubmitting(values: z.infer<typeof formSchema>) {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/sizes`,
        {
          title: values.name,
        }
      )
      .then(function (response) {
        console.log(response);
        toast.success("Size added successfully");
        reFetchSizes(
          Array.isArray(params.storeID)
            ? params.storeID.toString()
            : params.storeID
        );
      })
      .catch(function (error) {
        toast.error(error.response.data);
      });
  }

  //Render the form
  return (
    <div className={"m-9"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitting)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Size</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. '100ml'" {...field} />
                </FormControl>
                <FormDescription>
                  Write your new size/unit here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
