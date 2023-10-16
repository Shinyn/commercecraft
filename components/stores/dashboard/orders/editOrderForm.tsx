//Form for submitting PUT-requests to api/billboards. The ID-field is readonly.
//TODO:Add disabled look for ID-field which does still permitts submission of data to backend.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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




const formSchema = z.object({
    id: z.string().min(1, { message: "category must be atleast 2 characters long" }).max(255,{ message: "category must be atleast 2 characters long" }),
    customerEmail: z.string().min(1, { message: "category must be atleast 2 characters long" }).max(255,{ message: "category must be atleast 2 characters long" }),
    customerName: z.string().min(1, { message: "category must be atleast 2 characters long" }).max(255,{ message: "category must be atleast 2 characters long" }),
    customerStreet: z.string().min(1, { message: "category must be atleast 2 characters long" }).max(255,{ message: "category must be atleast 2 characters long" }),
    customerPhone: z.string().min(1, { message: "category must be atleast 2 characters long" }).max(255,{ message: "category must be atleast 2 characters long" }),
    order_number: z.number().min(1, { message: "category must be atleast 2 characters long" }).max(Infinity,{ message: "category must be atleast 2 characters long" }),
    order_status: z.string().min(1, { message: "category must be atleast 2 characters long" }).max(255,{ message: "category must be atleast 2 characters long" }),
});

export function EditOrderForm(order: Order) {
    const params = useParams();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: order.id,
            customerEmail: order.customerEmail,
            customerPhone: order.customerPhone,
            customerName: order.customerName,
            customerStreet: order.customerstreet,
            order_number: order.order_number,
            order_status: order.order_status,
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const {order_status, id, order_number}= values
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${params.storeID}/orders/${id}`, {
            order_number,
            order_status,
            id
        })
            .then(function (response) {
                if (response.status == 200) {
                    toast.success("Orderstatus uppdated successfully");
                    setInterval(() => {
                        window.location.reload();
                      }, 3000);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
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
                                This is your orders ID, you can NOT change this.
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
                            <FormDescription>This is your ordernumber.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
             
                    <h4 className="font-bold">Customer</h4>
                    <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input readOnly={true}  {...field} />
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
                                    <Input readOnly={true}  {...field} />
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
                                    <Input readOnly={true}  {...field} />
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
                    name="order_status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Order status</FormLabel>
                            <FormControl>
                                <Input  {...field} />
                            </FormControl>
                            <FormDescription>This is your order status.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
