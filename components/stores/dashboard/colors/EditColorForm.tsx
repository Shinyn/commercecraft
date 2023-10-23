import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { Color } from '@/components/stores/dashboard/colors/colors';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import toast from 'react-hot-toast';
import { useColors } from '@/components/stores/dashboard/colors/zustand/zustandstate';

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Your color must have a name' })
    .max(30, { message: 'Color must be max 30 characters long' })
    .refine(
      (s) => !s.endsWith(' '),
      'Color should not begin nor end with a space, you absolute twat of a fool!'
    )
    .refine(
      (s) => !s.startsWith(' '),
      'Color should not begin nor end with a space, you absolute twat of a fool!'
    ),
  hex: z
    .string()
    .min(7)
    .max(7)
    .refine((s) => !s.includes(' '), {
      message: 'A hex code does not contain spaces, you fool!',
    }),
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
  const reFetchColors = useColors((state) => state.reFetchColors);

  function onSubmitting() {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/colors`,
        {
          id: color.id,
          title: form.getValues('title'),
          hex: form.getValues('hex'),
          oldTitle: color.title,
        }
      )
      .then(function (response) {
        toast.success('Color updated successfully!');
        reFetchColors(
          Array.isArray(params.storeID)
            ? params.storeID.toString()
            : params.storeID
        );
        return response.data;
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
                <Input type="color" placeholder="#000000" {...field} />
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
