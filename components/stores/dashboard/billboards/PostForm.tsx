//Form for submitting POST-requests to api/billboards
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { BillboardState } from "@/components/stores/dashboard/billboards/state";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  text: z.string().min(2).max(50),
  image: z.string().min(0).max(255),
  active: z.boolean(),
});

export function PostForm() {
  const updateBillboards = BillboardState((state) => state.updateBillboards);
  const params = useParams();
  const reFetchBillboards = BillboardState((state) => state.reFetchBillboards);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      image: "",
      active: false,
    },
  });

  /*   function onSubmit(values: z.infer<typeof formSchema>) {
      axios
        .post(`/api/${params.storeID}/billboards`, {
          values,
        })
        .then(function (response) {
          if (response.status == 201) {
            toast.success("Billboard uppdated successfully");
            axios
              .get(`/api/${params.storeID}/billboards`, {})
              .then(function (response) {
                updateBillboards(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } */


  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/billboards`, {
      values
    })
      .then(function (response) {
        if (response.status == 201) {
          toast.success("Billboard added successfully");
          reFetchBillboards(Array.isArray(params.storeID)?params.storeID.toString():params.storeID)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="Billboard text" {...field} />
              </FormControl>
              <FormDescription>This is your billboard message.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="url" {...field} />
              </FormControl>
              <FormDescription>This is your products image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activate </FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                If checked this billboard is displayed on you frontend.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
