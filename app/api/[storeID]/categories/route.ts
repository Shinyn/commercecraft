//File contains POST, GET and PATCH handlers for categories. POST creates a new enty, GET returns all entries and PATCH updates by ID.

import { NextResponse } from 'next/server';
import prismadb from '@/lib/db';
import { Category } from '@/components/stores/dashboard/categories/categories';

export async function POST(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const body = await req.json();
    body.storeId = params.storeID;
    const { title, storeId }: Category = body;
    const newCategory = await prismadb.category.create({
      data: {
        storeId,
        title,
      },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.log('api/categories/POST', error);
    if (error.code === 'P2002') {
      return new NextResponse('That category already exists', { status: 500 });
    }
    return new NextResponse('Something went wrong with the server', {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeID: string } }
) {
  try {
    const Categories = await prismadb.category.findMany({
      where: { storeId: params.storeID },
    });
    return NextResponse.json(Categories);
  } catch (error) {
    console.log('api/categories/GET', error);
    return new NextResponse(
      'Ooops, something went wrong when getting the categories',
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, 
  { params }: { params: { storeID: string } }) {
  try {
    const body = await req.json();
    const { id, oldTitle, title } = body;
    const updatedCategory = prismadb.category.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    const updateOnProducts = prismadb.product.updateMany({
      where: { category: oldTitle, storeId:params.storeID },
      data: {
        category: title,
      },
    });

    const transaction = await prismadb.$transaction([
      updatedCategory,
      updateOnProducts,
    ]);

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error: any) {
    console.log('api/categories/PATCH', error);
    if (error.code === 'P2002') {
      return new NextResponse('That category already exists', { status: 500 });
    }
    return new NextResponse(
      'Something went wrong when trying to update the category',
      {
        status: 500,
      }
    );
  }
}
