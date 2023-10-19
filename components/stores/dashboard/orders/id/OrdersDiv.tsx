export default function OrdersDiv({ orders }: any) {
    const { order_number, order_date, order_status, order_total } = orders;
    return (
      <div>
        <h1 className="text-3xl">Delivery note:</h1>
        <p className="font-bold">Order Number: {order_number}</p>
        <p className="">Order Total Price: {order_total} SEK</p>
        <p className="">Order Date: {order_date}</p>
      </div>
    );
  }