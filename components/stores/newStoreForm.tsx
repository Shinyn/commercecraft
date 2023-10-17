import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

//Form for adding a new category
export default function StoreForm() {
  const { userId } = useAuth();
  //Form validation
  const formSchema = z.object({
    user_id: z.string(),
    title: z.string().min(2, { message: 'category must be atleast 2 characters long' }),
  });
  //Form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: '',
      title: '',
    },
  });
  //Submit function
  function onSubmitting(values: z.infer<typeof formSchema>) {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores`, {
        user_id: userId,
        title: values.title,
      })
      .then(function (response) {
        toast.success('Store added successfully');
        setInterval(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Render the form
  return (
    <div className="">
      {/* <Toaster /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitting)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Store</FormLabel>
                <FormControl>
                  <Input placeholder="Store name" {...field} />
                </FormControl>
                <FormDescription>Write the name of your store here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
