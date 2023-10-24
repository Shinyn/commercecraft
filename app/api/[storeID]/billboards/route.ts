//File contains POST, GET and PATCH handlers, creating a new billboard, returning all billboards or updating a billboard respectively.

import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { Billboard } from "@/components/stores/dashboard/billboards/billboards";

export async function POST(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const body = await req.json();
    body.values.storeId = params.storeID;
    const { text, image, active, storeId }: Billboard = body.values;
    let newBillboard = undefined;
    if (active) {
      await prismadb.billboard
        .updateMany({
          where: {
            storeId,
            active,
          },
          data: { active: false },
        })

        .then(async function (response) {
          console.log(response);
          newBillboard = await prismadb.billboard.create({
            data: {
              storeId,
              text,
              image,
              active,
            },
          });
        })
        .catch(function (error) {
          console.log("api/billboards/POST", error);
          return new NextResponse(
            "Something went wrong when trying to save your billboard",
            { status: 500 }
          );
        });
    } else {
      newBillboard = await prismadb.billboard.create({
        data: {
          storeId,
          text,
          image,
          active,
        },
      });
    }
    return NextResponse.json(newBillboard, { status: 201 });
  } catch (error) {
    console.log("api/billboards/POST", error);
    return new NextResponse(
      "Something went wrong when trying to save your billboard",
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const Billboards = await prismadb.billboard.findMany({
      where: { storeId: params.storeID },
    });

    return NextResponse.json(Billboards);
  } catch (error) {
    console.log("api/billboards/GET", error);
    return new NextResponse(
      "Ooops, something went wrong when getting the billboards",
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const body = await req.json();
    body.values.storeId = params.storeID;
    const { id, text, image, active, storeId }: Billboard = body.values;
    let newBillboard = undefined;

    if (!id) {
      return NextResponse.json("Billboard id is missing from the request", {
        status: 400,
      });
    }
    if (active) {
      await prismadb.billboard
        .updateMany({
          where: { storeId, active },
          data: { active: false },
        })
        .then(async function (response) {
          newBillboard = await prismadb.billboard.update({
            where: { id },
            data: {
              text,
              image,
              active,
            },
          });
        })
        .catch(function (error) {
          console.log("api/billboards/POST", error);
          return new NextResponse(
            "Something went wrong when trying to save your billboard",
            { status: 500 }
          );
        });
    } else {
      newBillboard = await prismadb.billboard.update({
        where: { id },
        data: {
          text,
          image,
          active,
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
