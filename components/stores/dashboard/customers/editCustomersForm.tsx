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
import { useCustomers } from "./zustand/zustandstate";

import toast from "react-hot-toast";

export function EditCustomerForm(customer: Customer) {
  const { storeID } = useParams();
  const params = useParams();
  const reFetchCustomers = useCustomers((state) => state.reFetchCustomers);
  const noNumber = new RegExp(/^([^0-9]*)$/);
  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
  const customerSchema = z.object({
    id: z.string().min(2, { message: "Id must be at least 2 characters long" }),
    firstName: z
      .string()
      .min(2, {
        message: "You must fill in your name",
      })
      .max(250, { message: "Name is too long" })
      .regex(noNumber, { message: "No numbers!" })
      .refine((s) => !s.includes(" "), { message: "No Spaces!" }),
    lastName: z
      .string()
      .min(2, {
        message: "You must fill in your last name",
      })
      .max(250, { message: "Name is too long" })
      .regex(noNumber, { message: "No numbers!" })
      .refine((s) => !s.includes(" "), { message: "No Spaces!" }),
    e_mail: z
      .string()
      .email({
        message: "You must fill in your email",
      })
      .max(250, { message: "email is too long" })
      .refine((s) => !s.includes(" "), { message: "No Spaces!" }),
    phone: z.string().regex(phoneRegex, "Invalid Number!"),
    street: z
      .string()
      .min(5, {
        message: "You must fill in your street-address",
      })
      .max(250, { message: "Street-adress is too long" }),
    zipCode: z
      .number()
      .gte(10000, {
        message: "You must fill in your zip code",
      })
      .lte(999999, { message: "Zip code is too long" }),
    city: z
      .string()
      .min(2, {
        message: "You must fill in your city",
      })
      .max(250, { message: "Cityname is too long" })
      .regex(noNumber, { message: "No numbers!" })
      .refine((s) => !s.includes(" "), { message: "No Spaces!" }),
    numberOfOrders: z.number().min(0).max(Infinity),
  });

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      street: customer.street,
      zipCode: parseInt(customer.zipCode),
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
      zipCode = values.zipCode.toString(),
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
        reFetchCustomers(Array.isArray(storeID) ? storeID.toString() : storeID);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <ScrollArea className={"h-[800px] p-2 rounded-md"}>
      <div className={"m-2"}>
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
                    This is your customers&apos; ID, you can NOT change this.
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
