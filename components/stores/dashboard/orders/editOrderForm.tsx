//Form for submitting PUT-requests to api/billboards. The ID-field is readonly.
//TODO:Add disabled look for ID-field which does still permitts submission of data to backend.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Order } from "@/components/stores/dashboard/orders/order";
import { useOrders } from "./zustand/ordersState";

const formSchema = z.object({
  id: z
    .string()
    .min(1, { message: "category must be atleast 2 characters long" })
    .max(255, { message: "category must be atleast 2 characters long" }),
  customerEmail: z
    .string()
    .min(1, { message: "category must be atleast 2 characters long" })
    .max(255, { message: "category must be atleast 2 characters long" }),
  customerName: z
    .string()
    .min(1, { message: "category must be atleast 2 characters long" })
    .max(255, { message: "category must be atleast 2 characters long" }),
  customerStreet: z
    .string()
    .min(1, { message: "category must be atleast 2 characters long" })
    .max(255, { message: "category must be atleast 2 characters long" }),
  customerPhone: z
    .string()
    .min(1, { message: "category must be atleast 2 characters long" })
    .max(255, { message: "category must be atleast 2 characters long" }),
  order_number: z
    .number()
    .min(1, { message: "category must be atleast 2 characters long" })
    .max(Infinity, { message: "category must be atleast 2 characters long" }),
  delivered: z.boolean(),
  paid: z.boolean(),
});

export function EditOrderForm(order: Order) {
  const params = useParams();
  const reFetchCompleteOrders = useOrders(
    (state) => state.reFetchCompleteOrders
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: order.id,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      customerName: order.customerName,
      customerStreet: order.customerstreet,
      order_number: order.order_number,
      delivered: order.delivered,
      paid: order.paid,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { id, order_number, paid, delivered } = values;
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/orders/${id}`,
        {
          order_number,
          id,
          paid,
          delivered,
        }
      )
      .then(function (response) {
        if (response.status == 200) {
          toast.success("Order status uppdated successfully");
          reFetchCompleteOrders(
            Array.isArray(params.storeID)
              ? params.storeID.toString()
              : params.storeID
          );
        }
      })
      .catch(function (error) {
        toast.error(error.response.data);
      });
  }

  return (
    <ScrollArea className={"h-[500px] w-[350px] rounded-md border p-8"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input readOnly={true} placeholder="Order ID id" {...field} />
                </FormControl>
                <FormDescription>
                  This is your order ID, you can NOT change this.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order number</FormLabel>
                <FormControl>
                  <Input readOnly={true} {...field} />
                </FormControl>
                <FormDescription>This is your order number.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <h4 className="font-bold">Customer</h4>
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input readOnly={true} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input readOnly={true} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input readOnly={true} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerStreet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street adress</FormLabel>
                <FormControl>
                  <Input readOnly={true} placeholder="Order ID id" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormDescription>
            This is your customer information, you can not change this here.
          </FormDescription>
          <FormField
            control={form.control}
            name="paid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paid </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Check when order has been paid
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="delivered"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivered </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Check when order has been delivered
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
