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
import { useColors } from "@/components/stores/dashboard/colors/zustand/zustandstate";

//Form for adding a new color
export default function ColorForm() {
  const params = useParams();
  const reFetchColors = useColors((state) => state.reFetchColors);

  //Form validation
  const formSchema = z.object({
    name: z
      .string()
      .max(10, { message: "color must be max 10 charcaters long" })
      .nonempty({ message: "You must write a colorname" })
      .refine((s) => !s.includes(" "), { message: "No Spaces!" }),
    hex: z.string().min(7).max(7),
  });
  //Form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hex: "",
    },
  });
  //Submit function
  function onSubmitting(values: z.infer<typeof formSchema>) {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/colors`,
        {
          title: values.name,
          hex: values.hex,
        }
      )
      .then(function (response) {
        toast.success("Color added successfully!");
        reFetchColors(
          Array.isArray(params.storeID)
            ? params.storeID.toString()
            : params.storeID
        );
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
                <FormLabel>Name of Color</FormLabel>
                <FormControl>
                  <Input placeholder="Color" {...field} />
                </FormControl>
                <FormDescription>
                  Type in the name of the color here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Hex code</FormLabel>
                <FormControl>
                  <Input placeholder="#000000" {...field} />
                </FormControl>
                <FormDescription>
                  Type in Hex code of the color.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
