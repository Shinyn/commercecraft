//Type definiton for customers
import { Order } from "@/components/stores/dashboard/orders/order";

export type Customer = {
  id: string | undefined;
  storeId: string;
  firstname: string;
  lastname: string;
  street: string;
  zipCode: string;
  city: string;
  e_mail: string;
  phone: string;
  order: Order[];
};
