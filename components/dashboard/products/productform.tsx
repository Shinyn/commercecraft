import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
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
import SelectForAddProduct from "../../SelectForAddProduct";

export default function ProductForm() {
  const productSchema = z.object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters long" }),
    description: z
      .string()
      .min(5, { message: "Description must be at least 5 characters long" }),
    price: z
      .number()
      .min(0, { message: "Price must be a positive number" })
      .max(Infinity),
    image: z.string().url({ message: "Need URL" }),
    category: z.string(),
  });

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 1,
      image: "",
      category: "",
    },
  });

  function onSubmitting(values: z.infer<typeof productSchema>) {
    console.log("Onsubmitting:" + values);
    axios
      .post("/api/products", values)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className={"m-9"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitting)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Input placeholder="Product Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SelectForAddProduct
            placeholder="Select Category"
            apicall="/api/categories"
            valueSend={(value: string) => form.setValue("category", value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
