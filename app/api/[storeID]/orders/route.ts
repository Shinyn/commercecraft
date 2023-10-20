import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { storeID: string; id: string } }
  ) {
    const storeId = params.storeID;
    const id = params.id;
    if (id) {
      try {
        const Order = await prismadb.order.findUnique({
          where: { id },
        });
        return NextResponse.json(Order);
      } catch (error) {
        console.log("api/[storeId]/orders/[id]/GET", error);
        return new NextResponse(
          "Oops, something went wrong when getting the order",
          { status: 500 }
        );
      }
    } else {
      try {
        const Orders = await prismadb.order.findMany({
          where: { storeId },
        });
        return NextResponse.json(Orders);
      } catch (error) {
        console.log("api/[storeId]/customers/all/GET", error);
        return new NextResponse(
          "Oops, something went wrong when getting the orderlist",
          { status: 500 }
        );
      }
    }
  }