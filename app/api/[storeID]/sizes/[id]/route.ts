import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { useParams } from "next/navigation";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const deletedSize = await prismadb.size.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedSize, { status: 200 });
  } catch (error) {
    console.log("api/sizes/DELETE", error);
    return new NextResponse(
      "Ooops, something went wrong when deleting the size",
      { status: 500 }
    );
  }
}
