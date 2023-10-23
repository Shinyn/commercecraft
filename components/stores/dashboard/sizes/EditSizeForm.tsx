import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Size } from '@/components/stores/dashboard/sizes/sizes';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { useSizes } from './zustand/zustandstate';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Unit must be atleast 1 characters long' })
    .max(50, { message: 'Unit must be less than 50 characters long' })
    .nonempty({ message: 'You must write a unit' }),
  id: z.string(),
  storeId: z.string(),
});

//Form for adding a new Size
export default function EditSizeForm(size: Size) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: size.title,
      id: size.id,
      storeId: size.storeId,
    },
  });
  const params = useParams();
  const reFetchSizes = useSizes((state) => state.reFetchSizes);

  function onSubmitting() {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/sizes`,
        {
          id: size.id,
          title: form.getValues('title'),
          oldTitle: size.title,
        }
      )
      .then(function (response) {
        toast.success('Size updated successfully');
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
                <Input placeholder="Unit..." {...field} />
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
