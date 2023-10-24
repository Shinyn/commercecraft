//File contains POST and GET handlers, creating a new product and returning a specific product respectively.

import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { Product } from "@/components/stores/dashboard/products/products";

export async function POST(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const body = await req.json();
    body.storeId = params.storeID;
    const {
      storeId,
      title,
      description,
      ingredients,
      price,
      image,
      manufacturer,
      category,
      size,
      color,
      isarchived,
      isfeatured,
      stock,
    }: Product = body;
    const newProduct = await prismadb.product.create({
      data: {
        storeId,
        title,
        description,
        ingredients,
        price,
        image,
        manufacturer,
        category,
        size,
        color,
        isarchived,
        isfeatured,
        stock,
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
  { params }: { params: { storeID: string; id: string } }
) {
  const status = params.id;
  const storeId = params.storeID;

  switch (status) {
    case "active":
      try {
        const Products = await prismadb.product.findMany({
          where: { storeId, isarchived: false },
        });

        if (!Products) {
          return NextResponse.json("No available products found", {
            status: 400,
          });
        }

        return NextResponse.json(Products);
      } catch (error) {
        console.log("api/[storeId]/products/active/GET", error);
        return new NextResponse(
          "Ooops, something went wrong when getting the active products",
          { status: 500 }
        );
      }
      break;
    case "undefined":
      try {
        const Products = await prismadb.product.findMany({
          where: { storeId },
        });
        return NextResponse.json(Products);
      } catch (error) {
        console.log("api/products/GET", error);
        return new NextResponse(
          "Ooops, something went wrong when getting the products",
          { status: 500 }
        );
      }
      break;
    case "featured":
      try {
        const Products = await prismadb.product.findMany({
          where: { storeId, isfeatured: true },
        });

        if (!Products) {
          return NextResponse.json("No available products found", {
            status: 400,
          });
        }

        return NextResponse.json(Products);
      } catch (error) {
        console.log("api/[storeId]/products/featured/GET", error);
        return new NextResponse(
          "Ooops, something went wrong when getting the active products",
          { status: 500 }
        );
      }
      break;
    case "all":
      try {
        const Products = await prismadb.product.findMany({
          where: { storeId },
        });
        return NextResponse.json(Products);
      } catch (error) {
        console.log("api/products/all/GET", error);
        return new NextResponse(
          "Ooops, something went wrong when getting the products",
          { status: 500 }
        );
      }
      break;
    case "archived":
      try {
        const Products = await prismadb.product.findMany({
          where: { storeId, isarchived: true },
        });
        return NextResponse.json(Products);
      } catch (error) {
        console.log("api/[storeId]/products/archived/GET", error);
        return new NextResponse(
          "Ooops, something went wrong when getting the archived products",
          { status: 500 }
        );
      }
    default:
      try {
        const Products = await prismadb.product.findUniqueOrThrow({
          where: { id: status },
        });
                return NextResponse.json(Products);
      } catch (error) {
        console.log("api/[storeId]/products/[id]/GET", error);
        return new NextResponse(
          "Ooops, something went wrong when getting the product",
          { status: 500 }
        );
      }
      break;
  }
}

// ---------------

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resourceId = params.id;
    const updatedData = await req.json();
    const updatedResource = await prismadb.product.update({
      where: { id: resourceId },
      data: updatedData,
    });

    if (updatedResource) {
      return NextResponse.json(updatedResource, { status: 200 });
    } else {
      return new NextResponse("Resource not found", { status: 404 });
    }
  } catch (error) {
    console.log("api/products/", error);
    return new NextResponse(
      "Something went wrong when trying to update the product",
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resourceId = params.id;
    const deleteResult = await prismadb.product.delete({
      where: { id: resourceId },
    });

    if (deleteResult) {
      return new NextResponse(null, { status: 204 });
    } else {
      return new NextResponse("Resource not found", { status: 404 });
    }
  } catch (error) {
    console.log("api/products/DELETE", error);
    return new NextResponse(
      "Something went wrong when trying to delete the product",
      { status: 500 }
    );
  }
}
