import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Customer } from "@/components/stores/dashboard/customers/customer";
import toast from "react-hot-toast";

export function EditCustomerForm(customer: Customer) {
  const params = useParams();
  const customerSchema = z.object({
    id: z.string().min(2, { message: "Id must be at least 2 characters long" }),
    firstName: z
      .string()
      .min(1, { message: "Name must be at least 1 characters long" })
      .max(255, { message: "Name must be less than 255 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Name must be at least 1 characters long" })
      .max(255, { message: "Name must be less than 255 characters" }),
    street: z
      .string()
      .min(2, { message: "Streetname must be at least 2 characters long" }),
    zipCode: z
      .string()
      .min(0, { message: "Zip must be a positive number" })
      .max(6),
    city: z
      .string()
      .min(1, { message: "City must be at least 1 characters long" })
      .max(255, { message: "City must be less than 255 characters" }),
    phone: z
      .string()
      .min(1, { message: "Phone must be at least 1 characters long" })
      .max(255, { message: "Phone must be less than 255 characters" }),
    e_mail: z
      .string()
      .min(1, { message: "E-mail must be at least 1 characters long" })
      .max(255, { message: "E-mail must be less than 255 characters" }),
    numberOfOrders: z.number().min(0).max(Infinity),
  });

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      street: customer.street,
      zipCode: customer.zipCode,
      city: customer.city,
      e_mail: customer.e_mail,
      phone: customer.phone,
      numberOfOrders: customer.numberOfOrders,
    },
  });

  function onSubmitting(values: z.infer<typeof customerSchema>) {
    const {
      id,
      firstName,
      lastName,
      street,
      zipCode,
      city,
      e_mail,
      phone,
      numberOfOrders,
    } = values;
    axios
      .patch(`/api/${params.storeID}/customers/${id}`, {
        firstName,
        lastName,
        street,
        zipCode,
        city,
        e_mail,
        phone,
        numberOfOrders,
      })
      .then(function (response) {
        toast.success("Customer updated");
        setInterval(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <ScrollArea className={"h-[500px] w-[350px] rounded-md border p-8"}>
      <div className={"m-9"}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitting)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Id" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your customers' ID, you can NOT change this.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter street name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter zip here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfOrders"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orders made</FormLabel>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
}
