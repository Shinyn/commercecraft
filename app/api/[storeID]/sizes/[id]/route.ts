import { NextResponse } from 'next/server';
import prismadb from '@/lib/db';
import { useParams } from 'next/navigation';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const title = params.id;
    const deletedSize = prismadb.size.delete({
      where: {
        title,
      },
    });
    const removeFromProduct = prismadb.product.updateMany({
      where: { size: title },
      data: {
        size: '-',
      },
    });

    const transaction = await prismadb.$transaction([
      deletedSize,
      removeFromProduct,
    ]);

    return NextResponse.json(deletedSize, { status: 200 });
  } catch (error) {
    console.log('api/sizes/DELETE', error);
    return new NextResponse(
      'Ooops, something went wrong when deleting the size',
      { status: 500 }
    );
  }
}
