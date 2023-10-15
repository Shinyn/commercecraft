

export type Order = {
  id: string | undefined;
  store_id: string;
  order_number: number;
  order_date: Date;
  order_status: string;
  order_total: number;
  order_items: OrderItem[];
};

export type OrderItem = {
  title: string;
  amount: number;
  price: number;
};
