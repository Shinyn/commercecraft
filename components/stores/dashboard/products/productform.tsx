import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import SelectForAddProduct from '@/components/stores/dashboard/products/SelectForAddProduct';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProductForm() {
  const params = useParams();
  const productSchema = z.object({
    title: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    description: z
      .string()
      .min(2, { message: 'Description must be at least 2 characters long' })
      .max(255, { message: 'Description must be less than 255 characters' }),
    price: z.number().min(0, { message: 'Price must be a positive number' }).max(Infinity),
    image: z.string().url({ message: 'Need URL' }).max(255, { message: 'URL must be less than 255 characters' }),
    category: z.string(),
    color: z.string(),
    size: z.string(),
    manufacturer: z.string().min(2, {
      message: 'Manufacturer must be at least 2 characters long',
    }),
    isarchived: z.boolean(),
    isfeatured: z.boolean(),
    ingredients: z.string().min(2, { message: 'Ingredient list must be at least 2 characters long' }).max(255, {
      message: 'Ingredient list must be less than 255 characters',
    }),
    stock: z.number().max(Infinity),
  });

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      
      title: "",
      description: "",
      price: 0,
      image: "",
      category: "",
      manufacturer: "",
      color: "",
      size: "",
      isarchived: false,
      isfeatured: false,
      ingredients: '',
      stock: 0,
    },
  });

  function onSubmitting(values: z.infer<typeof productSchema>) {
    axios
      .post(`/api/${params.storeID}/products/${params.id}`, values)
      .then(function (response) {
        toast.success('Product added');
        setInterval(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <ScrollArea className={'h-[700px] w-[400px] rounded-md p-2'}>
      <div className={'p-2'}>
        <h4 className={'mb-2 text-lg font-bold text-center'}>Add new product</h4>
        <p className={'text-sm text-center text-gray-700 mb-8'}>
          Fill in the form to add information about your new product
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitting)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="What's the name of your product?" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Product description" {...field} />
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
                  <FormLabel>Unit Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      value={+field.value}
                      onChange={(event) => {
                        let newValue = event.target.value
                        if (newValue.startsWith('0')) {
                          newValue = newValue.substring(1)
                          console.log(newValue)
                        }
                        event.target.value = newValue
                        field.value = +newValue
                        field.onChange(+event.target.value)
                      }}
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
            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of manufacturer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Color</FormLabel>
              <SelectForAddProduct
                placeholder="Select Color"
                apicall={`/api/${params.storeID}/colors`}
                valueSend={(value: string) => form.setValue('color', value)}
              />
            </FormItem>
            <FormItem>
              <FormLabel>Size</FormLabel>
              <SelectForAddProduct
                placeholder="Select size"
                apicall={`/api/${params.storeID}/sizes`}
                valueSend={(value: string) => form.setValue('size', value)}
              />
            </FormItem>
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredient list</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingredient list" {...field} />
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
                  <FormLabel className={'mr-2'}>Featured?</FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormDescription>If checked, this product will be featured on your web shop.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isarchived"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={'mr-2'}>Archived?</FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormDescription>If checked, this product will be stored in your archive.</FormDescription>
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
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      value={+field.value}
                      onChange={(event) => {
                        let newValue = event.target.value
                        if (newValue.startsWith('0')) {
                          newValue = newValue.substring(1)
                          console.log(newValue)
                        }
                        event.target.value = newValue
                        field.value = +newValue
                        field.onChange(+event.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Product Category</FormLabel>
              <SelectForAddProduct
                placeholder="Select Category"
                apicall={`/api/${params.storeID}/categories`}
                valueSend={(value: string) => form.setValue('category', value)}
              />
            </FormItem>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
}
