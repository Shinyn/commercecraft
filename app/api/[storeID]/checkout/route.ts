import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { Order, OrderItem } from "@/components/stores/dashboard/orders/order";
import { Customer } from "@/components/stores/dashboard/customers/customer";

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
    const {
      storeId,
      firstName,
      lastName,
      street,
      zipCode,
      city,
      phone,
    }: Customer = body.sendingData;
    const e_mail = body.sendingData.email;

    await prismadb.$transaction(
      body.sendingData.basketerino.map((item: any) => {
        return prismadb.product.update({
          where: {
            storeId: store_id,
            id: item.id,
          },
          data: {
            stock: item.stock - item.amount,
          },
        });
      })
    );

    const order_items: OrderItem[] = body.sendingData.basketerino.map(
      (item: any) => {
        return {
          title: item.title,
          amount: item.amount,
          price: item.price,
        };
      }
    );

    const customer = await prismadb.customer.findUnique({
      where: {
        storeId: store_id,
        e_mail,
      },
    });
    if (customer !== null) {
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
      const updateCustomer = await prismadb.customer.update({
        where: {
          storeId: store_id,
          e_mail,
        },
        data: {
          storeId,
          firstName,
          lastName,
          street,
          zipCode,
          city,
          e_mail,
          phone,
          numberOfOrders: customer.numberOfOrders + 1,
          Order: {
            connect: {
              id: newOrder.id,
            },
          },
        },
      });
      return NextResponse.json(newOrder, { status: 201 });
    } else {
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
      const newCustomer = await prismadb.customer.create({
        data: {
          storeId: store_id,
          firstName,
          lastName,
          street,
          zipCode,
          city,
          e_mail,
          phone,
          Order: {
            connect: {
              id: newOrder.id,
            },
          },
        },
      });
      return NextResponse.json(newOrder, { status: 201 });
    }
  } catch (error) {
    console.log("api/checkout/POST", error);
    return new NextResponse(
      "Something went wrong when trying to save your Order",
      { status: 500 }
    );
  }
}
