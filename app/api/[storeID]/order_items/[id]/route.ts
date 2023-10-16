import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { storeID: string; id: string } }
) {
  let items = params.id;
  const storeId = params.storeID;
  const number = parseInt(items);
  try {
    const Order_items = await prismadb.orderItem.findMany({
      where: {
        orderId: number,
      },
    });
    return NextResponse.json(Order_items);
  } catch (error) {
    console.log("api/[storeId]/order_items/[id]/GET", error);
    return new NextResponse(
      "Ooops, something went wrong when getting the order",
      { status: 500 }
    );
  }
}
