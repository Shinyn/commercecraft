//File contains POST and GET handlers, creating a new billboard and returning all billboards respectively.

import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { useParams } from "next/navigation";
import { Store } from "@/components/stores/stores";

export async function POST(
  req: Request
  //TODO: Add params for extracting store when stores are implemented in dashboard
) {
  try {
    const body = await req.json();
    const { user_id, title }: Store = body;
    //Remove activation from any previous billboards.

    const newStore = await prismadb.store.create({
      data: {
        user_id,
        title,
      },
    });

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    console.log("api/stores/POST", error);
    return new NextResponse(
      "Something went wrong when trying to save your store",
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request
  //TODO: Add params for extracting store when stores are implemented in dashboard
) {
  try {
    const body = await req.json();
    const { id, user_id, title }: Store = body;
    let newStore = undefined;

    if (!id) {
      return NextResponse.json("Billboard id is missing from the request", {
        status: 400,
      });
    }

    newStore = await prismadb.stores.update({
      where: { id, user_id },
      data: {
        title,
      },
    });

    return NextResponse.json(newStore, { status: 200 });
  } catch (error) {
    console.log("api/stores/PATCH", error);
    return new NextResponse(
      "Something went wrong when trying to update your store name",
      { status: 500 }
    );
  }
}
