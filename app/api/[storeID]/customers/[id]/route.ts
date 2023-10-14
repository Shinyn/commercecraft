//File contains POST and GET handlers, creating a new product and returning all products respectively.

import { NextResponse } from 'next/server';
import prismadb from '@/lib/db';
import { Customer } from '@/components/stores/dashboard/customers/customer';


export async function GET(
  req: Request,
  { params }: { params: { storeID: string; id: string } }
) {
  const status = params.id;
  const storeId = params.storeID

  if(status=="all"||status=="undefined"){
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
  }else{
    try {
      const Customers = await prismadb.customer.findUniqueOrThrow({
        where: { id: status },
      });
      console.log(Customers)
      return NextResponse.json(Customers);
    } catch (error) {
      console.log('api/[storeId]/ocustomerss/[id]/GET', error);
      return new NextResponse('Ooops, something went wrong when getting the customer', { status: 500 });
    }
  }
}

// ---------------

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const Id = params.id;
    const newData = await req.json();
    const updatedCustomer = await prismadb.order.update({
      where: { id:Id },
      data: newData,
    });

    if (updatedCustomer) {
      return NextResponse.json(updatedCustomer, { status: 200 });
    } else {
      return new NextResponse('Resource not found', { status: 404 });
    }
  } catch (error) {
    console.log('api/[storeId]/customer/[Id]', error);
    return new NextResponse('Something went wrong when trying to update the customer', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const Id = params.id;
    const deleteOrder = await prismadb.order.delete({
      where: { id: Id },
    });

    if (deleteOrder) {
      return new NextResponse(null, { status: 204 });
    } else {
      return new NextResponse('Customer not found', { status: 404 });
    }
  } catch (error) {
    console.log('api/[storeId]/customer/[id]/DELETE', error);
    return new NextResponse('Something went wrong when trying to delete the customer', { status: 500 });
  }
}
