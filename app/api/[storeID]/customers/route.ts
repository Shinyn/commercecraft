
import { NextResponse } from 'next/server';
import prismadb from '@/lib/db';
import { Customer } from '@/components/stores/dashboard/customers/customer';






export async function GET(
    req: Request,
    { params }: { params: { storeID: string; id: string } }
  ) {
    const storeId = params.storeID

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
    
  }