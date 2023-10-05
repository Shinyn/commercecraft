import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
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

export default function ProductForm() {
    const productSchema = z.object({
        id: z.string().min(2, { message: "ID must be at least 2 characters long" }),
        title: z.string().min(2, { message: "Title must be at least 2 characters long" }),
        description: z.string().min(5, { message: "Description must be at least 5 characters long" }),
        price: z.number().min(0, { message: "Price must be a positive number" }),
    });

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            id: "",
            title: "",
            description: "",
            price: 0,
        },
    });

    function onSubmitting(values: z.infer<typeof productSchema>) {
        axios.post('/api/products', values)
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
                        name="id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Product ID" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Product Title" {...field} />
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
                                <FormLabel>Product Description</FormLabel>
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
                                <FormLabel>Product Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Product Price" {...field} />
                                </FormControl>
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
