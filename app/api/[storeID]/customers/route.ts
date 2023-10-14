
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