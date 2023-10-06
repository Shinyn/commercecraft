import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const deletedCategory = await prismadb.category.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedCategory, { status: 201 });
  } catch (error) {
    console.log("api/categories/DELETE", error);
    return new NextResponse(
      "Ooops, something went wrong when deleting the category",
      { status: 500 }
    );
  }
}
