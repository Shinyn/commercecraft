//File contains POST and GET handlers, creating a new billboard and returning all billboards respectively.

import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { useParams } from "next/navigation";

export async function GET(
  req: Request,
  { params }: { params: { userID: string } }
) {
  try {
    const Stores = await prismadb.stores.findMany({
      where: { user_id: params.userID },
    });
    return NextResponse.json(Stores);
  } catch (error) {
    console.log("api/stores/GET", error);
    return new NextResponse(
      "Ooops, something went wrong when getting the stores",
      { status: 500 }
    );
  }
}
