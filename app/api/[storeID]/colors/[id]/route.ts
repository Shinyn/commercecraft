import { NextResponse } from 'next/server';
import prismadb from '@/lib/db';
import { useParams } from 'next/navigation';

export async function DELETE(
  req: Request,
  { params }: { params: {  storeID: string, id: string } }
) {
  try {
    const title = params.id;
    const storeId=params.storeID
    const deletedColor = prismadb.color.deleteMany({
      where: {
        title,
        storeId
      },
    });
    const removeFromProduct = prismadb.product.updateMany({
      where: { color: title, storeId },
      data: {
        color: '-',
      },
    });

    const transaction = await prismadb.$transaction([
      deletedColor,
      removeFromProduct,
    ]);

    return NextResponse.json(deletedColor, { status: 200 });
  } catch (error) {
    console.log('api/colors/DELETE', error);
    return new NextResponse(
      'Ooops, something went wrong when deleting the colors',
      { status: 500 }
    );
  }
}
