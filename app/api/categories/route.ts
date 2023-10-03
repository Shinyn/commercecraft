import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

// Types
export type Category = {
    title: string
}
// Route handlers for /api/categories
export async function POST(
    req: Request,
)
{
    try {
        const body = await req.json()
        const {title}: Category = body
        const newCategory = await prismadb.category.create({
            data: {
                title,
            },
        })
        return NextResponse.json(newCategory, { status: 201 })

    } catch (error) {
        console.log("api/categories/POST", error)
        return new NextResponse("Something went wrong when trying to save your category", { status: 500 })
    }
}

export async function GET(
    req: Request,
)
{
    try {
        const Categories = await prismadb.category.findMany()
        return NextResponse.json(Categories)

    } catch (error) {
        console.log("api/categories/GET", error)
        return new NextResponse("Ooops, something went wrong when getting the categories", { status: 500 })
    }
}

// TODO Route handlers for /api/categories/[id]
