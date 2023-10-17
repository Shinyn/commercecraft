import axios from "axios";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Color } from "@/components/stores/dashboard/colors/colors";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Color must be atleast 2 characters long" }),
  hex: z
    .string()
    .min(7, { message: "Hex-code must be at least 7 characters long" })
    .max(7, { message: "Hex-code must be no longer than 7 characters long" }),
  id: z.string(),
  storeId: z.string(),
});

//Form for adding a new color
export default function EditColorForm(color: Color) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: color.title,
      hex: color.hex,
      id: color.id,
      storeId: color.storeId,
    },
  });
  const params = useParams();

  function onSubmitting(e: any) {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/colors`,
        {
          id: color.id,
          title: form.getValues("title"),
          hex: form.getValues("hex"),
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitting)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Color..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hex"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Hex code</FormLabel>
              <FormControl>
                <Input placeholder="#000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
