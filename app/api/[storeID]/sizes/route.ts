import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { Size } from "@/components/stores/dashboard/sizes/sizes";

export async function POST(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const body = await req.json();
    body.storeId = params.storeID;
    const { title, storeId }: Size = body;
    const newSize = await prismadb.size.create({
      data: {
        storeId,
        title,
      },
    });
    return NextResponse.json(newSize, { status: 201 });
  } catch (error: any) {
    console.log("api/sizes/POST", error);
    if (error.code === "P2002") {
      return new NextResponse("That size already exists", { status: 500 });
    }
    return new NextResponse(
      "Something went wrong when trying to add your size",
      {
        status: 500,
      }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const Sizes = await prismadb.size.findMany({
      where: { storeId: params.storeID },
    });
    return NextResponse.json(Sizes);
  } catch (error) {
    console.log("api/sizes/GET", error);
    return new NextResponse(
      "Ooops, something went wrong when getting the sizes",
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, title } = body;
    const updatedSize = await prismadb.size.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    return NextResponse.json(updatedSize, { status: 200 });
  } catch (error: any) {
    console.log("api/sizes/PATCH", error);
    if (error.code === "P2002") {
      return new NextResponse("That size already exists", { status: 500 });
    }
    return new NextResponse(
      "Something went wrong when trying to update the size",
      {
        status: 500,
      }
    );
  }
}
