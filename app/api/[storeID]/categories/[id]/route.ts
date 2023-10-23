//File contains DELETE for category by ID

import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { storeID: string; id: string } }
) {
  try {
    const title = params.id;
    const storeId = params.storeID;
    const deletedCategory = prismadb.category.deleteMany({
      where: {
        title,
        storeId,
      },
    });
    const removeFromProduct = prismadb.product.updateMany({
      where: { category: title, storeId: storeId },
      data: {
        category: "-",
      },
    });

    const transaction = await prismadb.$transaction([
      deletedCategory,
      removeFromProduct,
    ]);

    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    console.log("api/categories/DELETE", error);
    return new NextResponse(
      "Ooops, something went wrong when deleting the category",
      { status: 500 }
    );
  }
}
