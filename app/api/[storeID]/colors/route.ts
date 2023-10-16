import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { Color } from "@/components/stores/dashboard/colors/colors";

export async function POST(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const body = await req.json();
    body.storeId = params.storeID;
    const { title, hex, storeId }: Color = body;
    const newColor = await prismadb.color.create({
      data: {
        storeId,
        title,
        hex,
      },
    });
    return NextResponse.json(newColor, { status: 201 });
  } catch (error) {
    console.log("api/colors/POST", error);
    return new NextResponse(
      "Something went wrong when trying to save your color",
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const Colors = await prismadb.color.findMany({
      where: { storeId: params.storeID },
    });
    return NextResponse.json(Colors);
  } catch (error) {
    console.log("api/colors/GET", error);
    return new NextResponse(
      "Ooops, something went wrong when getting the colors",
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, title, hex } = body;
    const updatedColor = await prismadb.color.update({
      where: {
        id,
      },
      data: {
        title,
        hex,
      },
    });
    return NextResponse.json(updatedColor, { status: 200 });
  } catch (error) {
    console.log("api/colors/PATCH", error);
    return new NextResponse(
      "Ooops, something went wrong when updating the color",
      { status: 500 }
    );
  }
}
