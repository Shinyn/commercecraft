import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import SelectForAddProduct from '@/components/stores/dashboard/products/SelectForAddProduct';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProductForm() {
  const params = useParams();
  const productSchema = z.object({
    title: z.string().min(2, { message: 'Title must be at least 2 characters long' }),
    description: z
      .string()
      .min(5, { message: 'Description must be at least 5 characters long' })
      .max(255, { message: 'Description must be less than 255 characters' }),
    price: z.number().min(0, { message: 'Price must be a positive number' }).max(Infinity),
    image: z.string().url({ message: 'Need URL' }).max(255, { message: 'URL must be less than 255 characters' }),
    category: z.string(),
    manufacturer: z.string().min(2, { message: 'Manufacturername must be at least 2 characters long' }),
    isarchived: z.boolean(),
    isfeatured: z.boolean(),
    ingredients: z
      .string()
      .min(5, { message: 'Ingredientslist must be at least 5 characters long' })
      .max(255, { message: 'Ingredientslist must be less than 255 characters' }),
    stock: z.number().min(0, { message: 'You have to have a stock of your product' }).max(Infinity),
  });

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 1,
      image: '',
      category: '',
      manufacturer: '',
      isarchived: false,
      isfeatured: false,
      ingredients: '',
      stock: 0,
    },
  });

  function onSubmitting(values: z.infer<typeof productSchema>) {
    console.log('Onsubmitting:' + values);
    axios
      .post(`/api/${params.storeID}/products/${params.id}`, values)
      .then(function (response) {
        toast.success('Product created');
        setInterval(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className={'m-9'}>
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
                  <Input type="number" min={1} {...field} onChange={(event) => field.onChange(+event.target.value)} />
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
          <FormField
            control={form.control}
            name="manufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer-name</FormLabel>
                <FormControl>
                  <Input placeholder="Name of manufacturer here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredientslist here</FormLabel>
                <FormControl>
                  <Input placeholder="ingredientslist here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isfeatured"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is featured ? </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  If checked this product is featured on your frontend.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isarchived"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is archived ? </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  If checked this product is archived on your frontend.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Stock</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} onChange={(event) => field.onChange(+event.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SelectForAddProduct
            placeholder="Select Category"
            apicall={`/api/${params.storeID}/categories`}
            valueSend={(value: string) => form.setValue('category', value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
