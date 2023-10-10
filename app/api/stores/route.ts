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

    const newStore = await prismadb.stores.create({
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

export async function PUT(
  req: Request
  //TODO: Add params for extracting store when stores are implemented in dashboard
) {
  try {
    const body = await req.json();
    const { id, text, image, active }: Billboard = body.values;
    let newBillboard = undefined;

    if (!id) {
      return NextResponse.json("Billboard id is missing from the request", {
        status: 400,
      });
    }
    if (active) {
      //Remove activation from any previous billboards if needed
      const updated = await prismadb.billboard
        .updateMany({
          where: { active: 1 },
          data: { active: 0 },
        })
        .then(async function (response) {
          //update the billboard
          newBillboard = await prismadb.billboard.update({
            where: { id },
            data: {
              text,
              image,
              active: 1,
            },
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      newBillboard = await prismadb.billboard.update({
        where: { id },
        data: {
          text,
          image,
          active: 0,
        },
      });
    }

    return NextResponse.json(newBillboard, { status: 200 });
  } catch (error) {
    console.log("api/billboards/POST", error);
    return new NextResponse(
      "Something went wrong when trying to update your billboard",
      { status: 500 }
    );
  }
}
