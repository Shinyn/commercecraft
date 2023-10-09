//File contains POST and GET handlers, creating a new product and returning all products respectively.

import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

//TODO:Remove this definition and replace with import of product typedefiniton from other branch
export type Product = {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export async function POST(
  req: Request
  //TODO: Add params for extracting store when stores are implemented in dashboard
) {
  try {
    const body = await req.json();
    const { title, description, price, image, category }: Product = body;

    const newProduct = await prismadb.product.create({
      data: {
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

export async function GET(req: Request) {
  try {
    const Products = await prismadb.product.findMany();
    return NextResponse.json(Products);
  } catch (error) {
    console.log("api/products/GET", error);
    return new NextResponse(
      "Ooops, something went wrong when getting the products",
      { status: 500 }
    );
  }
}
