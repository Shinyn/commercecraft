import { NextResponse } from 'next/server';
import prismadb from '@/lib/db';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const title = params.id;
    const deletedCategory = prismadb.category.delete({
      where: {
        title,
      },
    });
    const removeFromProduct = prismadb.product.updateMany({
      where: { category: title },
      data: {
        category: '-',
      },
    });

    const transaction = await prismadb.$transaction([
      deletedCategory,
      removeFromProduct,
    ]);

    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    console.log('api/categories/DELETE', error);
    return new NextResponse(
      'Ooops, something went wrong when deleting the category',
      { status: 500 }
    );
  }
}
