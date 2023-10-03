import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"

  export default function CategoryForm() {

    const formSchema = z.object({
    name: z.string().min(2,{message: "category must be atleast 2 characters long"}),
    
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmitting(values: z.infer<typeof formSchema>) {

          axios.post('/api/categories', {
              title: values.name
      })
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Category</FormLabel>
              <FormControl>
                <Input placeholder="category"  {...field} />
              </FormControl>
              <FormDescription>
                Write your new category here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
    )
}