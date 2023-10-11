//File contains POST and GET handlers, creating a new product and returning all products respectively.

import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { useParams } from "next/navigation";
import { Product } from "@/components/stores/dashboard/products/products";

export async function POST(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const body = await req.json();
    body.storeId = params.storeID;
    const { title, description, price, image, category, storeId }: Product =
      body;

    const newProduct = await prismadb.product.create({
      data: {
        storeId,
        title,
        description,
        price,
        image,
        category,
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.log("api/products/POST", error);
    return new NextResponse(
      "Something went wrong when trying to save your product",
      { status: 500 }
    );
  }
}

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
