//File contains POST and GET handlers, creating a new product and returning all products respectively.

import { NextResponse } from 'next/server';
import prismadb from '@/lib/db';
import { useParams } from 'next/navigation';
import { Product } from '@/components/stores/dashboard/products/products';

export async function POST(req: Request, { params }: { params: { storeID: string } }) {
  try {
    const body = await req.json();
    body.storeId = params.storeID;
    const { title, description, price, image, category, storeId }: Product = body;

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
    console.log('api/products/POST', error);
    return new NextResponse('Something went wrong when trying to save your product', { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { storeID: string } }) {
  try {
    const Products = await prismadb.product.findMany({
      where: { storeId: params.storeID },
    });
    return NextResponse.json(Products);
  } catch (error) {
    console.log('api/products/GET', error);
    return new NextResponse('Ooops, something went wrong when getting the products', { status: 500 });
  }
}

// ---------------

export async function UPDATE(req: Request, { params }: { params: { id: string } }) {
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
      return new NextResponse('Resource not found', { status: 404 });
    }
  } catch (error) {
    console.log('api/products/UPDATE', error);
    return new NextResponse('Something went wrong when trying to update the resource', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const resourceId = params.id;
    const deleteResult = await prismadb.product.delete({
      where: { id: resourceId },
    });

    if (deleteResult) {
      return new NextResponse(null, { status: 204 });
    } else {
      return new NextResponse('Resource not found', { status: 404 });
    }
  } catch (error) {
    console.log('api/products/DELETE', error);
    return new NextResponse('Something went wrong when trying to delete the resource', { status: 500 });
  }
}
