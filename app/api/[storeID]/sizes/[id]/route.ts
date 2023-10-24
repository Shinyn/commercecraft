import { NextResponse } from 'next/server';
import prismadb from '@/lib/db';
import { useParams } from 'next/navigation';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string, storeID: string  } }
) {
  try {
    const title = params.id;
    const storeId=params.storeID
    const deletedSize = prismadb.size.deleteMany({
      where: {
        title,
        storeId
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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const Size = await prismadb.size.findMany({
      where: { id: params.id },
    });
    if(Size.length<1){
      return new NextResponse(
        'No size with that id was found',
        { status: 500 }
      );
    }
    return NextResponse.json(Size);
  } catch (error) {
    console.log('api/sizes/GET', error);
    return new NextResponse(
      'Ooops, something went wrong when getting the size',
      { status: 500 }
    );
  }
}
