//File contains POST and GET handlers, creating a new product and returning all products respectively.

import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { Customer } from "@/components/stores/dashboard/customers/customer";

export async function GET(
  req: Request,
  { params }: { params: { storeID: string; id: string } }
) {
  const status = params.id;
  const storeId = params.storeID;

  if (status == "all" || status == "undefined") {
    try {
      const Customers = await prismadb.customer.findMany({
        where: { storeId },
      });
      return NextResponse.json(Customers);
    } catch (error) {
      console.log("api/[storeId]/customers/all/GET", error);
      return new NextResponse(
        "Ooops, something went wrong when getting the customerlist",
        { status: 500 }
      );
    }
  } else {
    try {
      const Customers = await prismadb.customer.findUniqueOrThrow({
        where: { id: status },
      });
      return NextResponse.json(Customers);
    } catch (error) {
      console.log("api/[storeId]/ocustomerss/[id]/GET", error);
      return new NextResponse(
        "Ooops, something went wrong when getting the customer",
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
    const updatedCustomer = await prismadb.customer.update({
      where: { id: Id },
      data: newData,
    });

    if (updatedCustomer) {
      return NextResponse.json(updatedCustomer, { status: 200 });
    } else {
      return new NextResponse("Resource not found", { status: 404 });
    }
  } catch (error) {
    console.log("api/[storeId]/customer/[Id]", error);
    return new NextResponse(
      "Something went wrong when trying to update the customer",
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const Id = params.id;
  try {
    await prismadb.order.findMany({
      where: { customerId: Id },
      select: { order_number: true },
    }).then(async (res) => {
      const orderNumbers: number[] = []
      res.forEach((item) => {
        orderNumbers.push(item.order_number)
      })
      return orderNumbers
    }).then(async (ressie) => {
      console.log(ressie)
      const deleteOrderItems = await prismadb.orderItem.deleteMany({
        where: {
          orderId: { in: ressie }

        }
      })
      const deleteOrder = prismadb.order.deleteMany({
        where: { customerId: Id },
      });
      const deleteCustomer = await prismadb.customer.delete({
        where: { id: Id }
      })

      const transaction = await prismadb.$transaction([
        deleteOrder,
        deleteCustomer,

      ]);



      if (transaction) {
        return new NextResponse(null, { status: 204 });
      } else {
        return new NextResponse("Resource not found", { status: 404 });
      }

    })


    const deleteOrderItems = await prismadb.orderItem.deleteMany({
      where: {
        orderId: { in: orderNumbers }

      }
    })
    const deleteOrder = prismadb.order.deleteMany({
      where: { customerId: Id },
    });
    const deleteCustomer = await prismadb.customer.delete({
      where: { id: Id }
    })

    const transaction = await prismadb.$transaction([
      deleteOrderItems,
      deleteOrder,
      deleteCustomer,

    ]);



    if (transaction) {
      return new NextResponse(null, { status: 204 });
    } else {
      return new NextResponse("Resource not found", { status: 404 });
    }

  }
  catch (error) {
    console.log("api/[storeId]orders/[id]/DELETE", error);
    return new NextResponse(
      "Something went wrong when trying to delete the order",
      { status: 500 }
    );
  }

}
/*   const Id = params.id;
  //Find orders and extract order_numbers for the customer
  await prismadb.order.findMany({
    where: { customerId: Id },
  }).then(async function (response) {
    console.log(response)
    const orderIds: number[] = []
    response.forEach((item) => {
      orderIds.push(item.order_number)
    })
    await prismadb.orderItem.deleteMany({
      where: { id: { in: orderIds } }
    }).then((async function (ressie) {
      console.log(ressie)
      const deletedOrders = await prismadb.order.deleteMany({
        where: { order_number: { in: orderIds } }
      })
      console.log(deletedOrders)
    })).then(async function (res){
      console.log(res)
      const deletedCustomer = await prismadb.customer.delete({
        where: { id:Id } })
        if(deletedCustomer){
          return NextResponse.json(deletedCustomer, { status: 204 });

        }
      })
    })    
  .catch(function (error) {
    console.log("api/[storeId]/customer/[id]/DELETE", error);
    return new NextResponse(
      "Something went wrong when trying to delete the customer",
      { status: 500 }
    );
  }) */
