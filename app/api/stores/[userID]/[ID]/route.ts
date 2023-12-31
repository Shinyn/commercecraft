import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { useParams } from "next/navigation";

export async function DELETE(
  req: Request,
  { params }: { params: { userID: string; ID: string } }
) {
  try {
    const Stores = await prismadb.store.delete({
      where: { id: params.ID },
    });
    return NextResponse.json(Stores);
  } catch (error) {
    console.log("api/stores/DELETE", error);
    return new NextResponse(
      "Ooops, something went wrong when getting the stores",
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { userID: string; ID: string } }
) {
  try {
    const Store = await prismadb.store.findUnique({
      where: { user_id: params.userID, id: params.ID },
    });
    return NextResponse.json(Store);
  } catch (error) {
    console.log("api/stores/GET", error);
    return new NextResponse(
      "Ooops, something went wrong when getting the stores",
      { status: 500 }
    );
  }
}
