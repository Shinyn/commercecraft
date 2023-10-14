import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { Order, OrderItem } from "@/components/stores/dashboard/orders/order";

export async function OPTIONS(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const body = await req.json();
    const store_id = params.storeID;
    const { order_total }: Order = body.sendingData;
    const { basketerino } = body;
    const order_items: OrderItem[] = body.sendingData.basketerino.map(
      (item: any) => {
        return {
          title: item.title,
          amount: item.amount,
          price: item.price,
        };
      }
    );
    const newOrder = await prismadb.order.create({
      data: {
        storeId: store_id,
        order_total,
        order_number: Math.floor(Math.random() * 10000000),
        order_items: {
          create: order_items,
        },
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.log("api/checkout/POST", error);
    return new NextResponse(
      "Something went wrong when trying to save your Order",
      { status: 500 }
    );
  }
}
