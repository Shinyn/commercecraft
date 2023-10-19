export type Order = {
  id: string;
  store_id: string;
  customer_id:string;
  order_number: number;
  order_date: Date;
  order_status: string;
  order_total: number;
  order_items: OrderItem[];
  customerEmail: string|undefined;
  customerName: string|undefined,
  customerstreet: string|undefined;
  customerPhone: string|undefined;
  delivered:boolean;
  paid:boolean;

};

export type OrderItem = {
  title: string;
  amount: number;
  price: number;
};

