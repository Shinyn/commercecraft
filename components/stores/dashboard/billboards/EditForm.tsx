//Form for submitting PUT-requests to api/billboards. The ID-field is readonly.
//TODO:Add disabled look for ID-field which does still permitts submission of data to backend.
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
import { Billboard } from "@/components/stores/dashboard/billboards/billboards";
import { BillboardState } from "@/components/stores/dashboard/billboards/zustand/zustandstate";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  id: z.string().min(3).max(50),
  text: z.string().min(2).max(50),
  image: z.string().min(0).max(255),
  active: z.boolean(),
});

export function EditForm(billboard: Billboard) {
  const reFetchBillboards = BillboardState((state) => state.reFetchBillboards);
  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: billboard.id,
      text: billboard.text,
      image: billboard.image,
      active: Boolean(billboard.active),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/billboards`, {
      values
    })
      .then(function (response) {
        if (response.status == 200) {
          toast.success("Billboard uppdated successfully");
          reFetchBillboards(Array.isArray(params.storeID) ? params.storeID.toString() : params.storeID)
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
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input readOnly={true} placeholder="Billboard id" {...field} />
              </FormControl>
              <FormDescription>
                This is your billboard ID, you can NOT change this.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
