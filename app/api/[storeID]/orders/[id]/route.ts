//File contains POST and GET handlers, creating a new product and returning all products respectively.

import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { Order } from "@/components/stores/dashboard/orders/order";

export async function GET(
  req: Request,
  { params }: { params: { storeID: string; id: string } }
) {
  const status = params.id;
  const storeId = params.storeID;

  if (status == "all" || status == "undefined") {
    try {
      const Orders = await prismadb.order.findMany({
        where: { storeId },
      });
      return NextResponse.json(Orders);
    } catch (error) {
      console.log("api/[storeId]orders/all/GET", error);
      return new NextResponse(
        "Ooops, something went wrong when getting the orderlist",
        { status: 500 }
      );
    }
  } else {
    try {
      const Orders = await prismadb.order.findUniqueOrThrow({
        where: { id: status },
      });
      return NextResponse.json(Orders);
    } catch (error) {
      console.log("api/[storeId]/orders/[id]/GET", error);
      return new NextResponse(
        "Ooops, something went wrong when getting the order",
        { status: 500 }
      );
    }
  }
}

// ---------------

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const Id = params.id;
    const newData = await req.json();
    const updatedOrder = await prismadb.order.update({
      where: { id: Id },
      data: newData,
    });

    if (updatedOrder) {
      return NextResponse.json(updatedOrder, { status: 200 });
    } else {
      return new NextResponse("Resource not found", { status: 404 });
    }
  } catch (error) {
    console.log("api/[storeId]/orders/[Id]", error);
    return new NextResponse(
      "Something went wrong when trying to update the order",
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const Id = params.id;
    const findOrderNumber = await prismadb.order.findUnique({
      where: { id: Id },
      select: { order_number: true },
    });
    if (!findOrderNumber) {
      return new NextResponse("Resource not found", { status: 404 });
    }
    const orderNumber = findOrderNumber.order_number;
    const deleteOrderItems = prismadb.orderItem.deleteMany({
      where: { orderId: orderNumber },
    });

    const deleteOrder = prismadb.order.delete({
      where: { id: Id },
    });

    const transaction = await prismadb.$transaction([
      deleteOrderItems,
      deleteOrder,
    ]);

    if (transaction) {
      return new NextResponse(null, { status: 204 });
    } else {
      return new NextResponse("Resource not found", { status: 404 });
    }
  } catch (error) {
    console.log("api/[storeId]orders/[id]/DELETE", error);
    return new NextResponse(
      "Something went wrong when trying to delete the order",
      { status: 500 }
    );
  }
}
