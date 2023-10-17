//Type definiton for customers
import { Order } from "@/components/stores/dashboard/orders/order";

export type Customer = {
  id: string | undefined;
  storeId: string;
  firstName: string;
  lastName: string;
  street: string;
  zipCode: string;
  city: string;
  e_mail: string;
  phone: string;
  numberOfOrders:number;
  order: Order[];
};
