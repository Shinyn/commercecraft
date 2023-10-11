
import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { useParams } from "next/navigation";

export async function DELETE(
    req: Request, 
    { params }: { params: { storeID: string; id: string } }

    //TODO: Add params for extracting store when stores are implemented in dashboard
) {
    try {
        const id=params.id
        
        if (!id) {
            return NextResponse.json("Billboard id is missing from the request", { status: 400 })
        } else {
            const deletedBillboard = await prismadb.billboard.delete({
                where: { id },
            })
            return NextResponse.json(deletedBillboard, { status: 200 })
        }
    } catch (error) {
        console.log("api/billboards/DELETE", error)
        return new NextResponse("Something went wrong when trying to delete your billboard", { status: 500 })
    }
}