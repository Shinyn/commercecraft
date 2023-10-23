import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SelectForAddProduct from '@/components/stores/dashboard/products/SelectForAddProduct';
import { useParams } from 'next/navigation';
import { Product } from '@/components/stores/dashboard/products/products';
import { Checkbox } from '@/components/ui/checkbox';
import toast from 'react-hot-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProducts } from './zustand/zustandstate';

export function EditProductForm(product: Product) {
  const { storeID } = useParams();
  const reFetchProducts = useProducts((state) => state.reFetchProducts);

  const productSchema = z.object({
    title: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long' })
      .nonempty({ message: 'You must write a name' }),
    description: z
      .string()
      .min(2, { message: 'Description must be at least 2 characters long' })
      .max(255, { message: 'Description must be less than 255 characters' })
      .nonempty({ message: 'You must write a description' }),
    price: z
      .number()
      .max(Infinity)
      .min(0.5, { message: 'Price must be 0.5 or more' }),
    image: z
      .string()
      .url({ message: 'Need URL' })
      .max(255, { message: 'URL must be less than 255 characters' })
      .nonempty({ message: 'You must write a URL' }),
    category: z.string().nonempty({ message: 'You must select a category' }),
    color: z.string().nonempty({ message: 'You must select a color' }),
    size: z.string().nonempty({ message: 'You must select a size' }),
    manufacturer: z
      .string()
      .min(2, {
        message: 'Manufacturer must be at least 2 characters long',
      })
      .max(255, { message: 'Manufacturer must be less than 255 characters' })
      .nonempty({ message: 'You must write a manufacturer' }),
    isarchived: z.boolean(),
    isfeatured: z.boolean(),
    ingredients: z
      .string()
      .min(2, { message: 'Ingredient list must be at least 2 characters long' })
      .max(255, {
        message: 'Ingredient list must be less than 255 characters',
      })
      .nonempty({ message: 'You must write a ingredient list' }),
    stock: z.number().max(Infinity),
  });

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      color: product.color,
      size: product.size,
      manufacturer: product.manufacturer,
      isarchived: product.isarchived,
      isfeatured: product.isfeatured,
      ingredients: product.ingredients,
      stock: product.stock,
    },
  });

  function onSubmitting(values: z.infer<typeof productSchema>) {
    axios
      .patch(`/api/${storeID}/products/${product.id}`, values)
      .then(function (response) {
        toast.success('Product updated');
        reFetchProducts(Array.isArray(storeID) ? storeID.toString() : storeID);
      })
      .catch(function (error) {
        toast.error(error.response.data);
      });
  }

  return (
    <ScrollArea className={'h-[500px] w-[350px] rounded-md border'}>
      <div className={'m-9'}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitting)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What's the name of your product?"
                      {...field}
                    />
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
                  <FormLabel>Unit Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                      value={field.value}
                      onChange={(event) => {
                        let newValue = event.target.value;
                        if (
                          newValue.startsWith('0') &&
                          !newValue.includes('.')
                        ) {
                          newValue = newValue.substring(1);
                        }
                        event.target.value = newValue;
                        field.value = +newValue;
                        field.onChange(+event.target.value);
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
                    <Input placeholder="Name of manufacturer here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color (optional)</FormLabel>
                  <FormControl>
                    <SelectForAddProduct
                      placeholder={product.color}
                      apicall={`/api/${storeID}/colors`}
                      value={product.color}
                      valueSend={(value: string) =>
                        form.setValue('color', value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <SelectForAddProduct
                      placeholder={product.size}
                      apicall={`/api/${storeID}/sizes`}
                      value={product.size}
                      valueSend={(value: string) =>
                        form.setValue('size', value)
                      }
                    />
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
                  <FormLabel>Ingredient list</FormLabel>
                  <FormControl>
                    <Input placeholder="ingredient list here" {...field} />
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
                  <FormLabel className={'mr-2'}>Featured? </FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    If checked this product will be featured on your web shop.
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
                  <FormLabel className={'mr-2'}>Archived? </FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    If checked this product will be stored in your archive.
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
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      value={+field.value}
                      onChange={(event) => {
                        let newValue = event.target.value;
                        if (newValue.startsWith('0')) {
                          newValue = newValue.substring(1);
                        }
                        event.target.value = newValue;
                        field.value = +newValue;
                        field.onChange(+event.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <SelectForAddProduct
                      placeholder={product.category}
                      apicall={`/api/${storeID}/categories`}
                      value={product.category}
                      valueSend={(value: string) =>
                        form.setValue('category', value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
}
