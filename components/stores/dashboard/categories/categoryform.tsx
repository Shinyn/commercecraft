import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
import  {CategoryState} from "@/components/stores/dashboard/categories/zustand/zustandstate"

//Form for adding a new category
export default function CategoryForm() {
  const params = useParams();
  const reFetchCategories = CategoryState((state) => state.reFetchCategories);

  //Form validation
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "category must be atleast 2 characters long" }),
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/categories`,
        {
          title: values.name,
        }
      )
      .then(function (response) {
        toast.success("Category added successfully");
        reFetchCategories(Array.isArray(params.storeID) ? params.storeID.toString() : params.storeID)
      })
      .catch(function (error) {
        console.log(error);
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
                <FormLabel>New Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
                <FormDescription>Write your new category here.</FormDescription>
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
