//File contains GET and DELETE handlers for billboards. GET returns active or inactive billboards. DELETE deletes by id.

import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { storeID: string; id: string } }
) {

  const { storeID } = params;
  if (params.id == "active") {
    try {
      const Billboards = await prismadb.billboard.findFirstOrThrow({
        where: { storeId: storeID, active: true },
      });

      if (!Billboards) {
        return NextResponse.json("No active billboard found", { status: 404 });
      }

      return NextResponse.json(Billboards);
    } catch (error) {
      console.log("api/billboards/active/GET", error);
      return new NextResponse(
        "Ooops, something went wrong when getting the active billboard",
        { status: 500 }
      );
    }
  } else if (params.id == "inactive") {
    try {
      const Billboards = await prismadb.billboard.findMany({
        where: { storeId: storeID, active: false },
      });
      return NextResponse.json(Billboards);
    } catch (error) {
      console.log("api/billboards/inactive/GET", error);
      return new NextResponse(
        "Ooops, something went wrong when getting the inactive billboard",
        { status: 500 }
      );
    }
  }else {
    try {
      const Billboard = await prismadb.billboard.findMany({
        where: { id:params.id },
      });
      if(Billboard.length<1){
        return new NextResponse(
          'No billboard with that id was found',
          { status: 500 }
        );
      }
      return NextResponse.json(Billboard);
    } catch (error) {
      console.log("api/billboards/inactive/GET", error);
      return new NextResponse(
        "Ooops, something went wrong when getting the inactive billboard",
        { status: 500 }
      );
    }

  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeID: string; id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json("Billboard id is missing from the request", {
        status: 400,
      });
    } else {
      const deletedBillboard = await prismadb.billboard.delete({
        where: { id },
      });
      return NextResponse.json(deletedBillboard, { status: 200 });
    }
  } catch (error) {
    console.log("api/billboards/DELETE", error);
    return new NextResponse(
      "Something went wrong when trying to delete your billboard",
      { status: 500 }
    );
  }
}
