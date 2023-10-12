import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const Products = await prismadb.product.findMany({
      where: { storeId: params.storeID },
    });
    return NextResponse.json(Products);
  } catch (error) {
    console.log("api/products/GET", error);
    return new NextResponse(
      "Ooops, something went wrong when getting the products",
      { status: 500 }
    );
  }
}
