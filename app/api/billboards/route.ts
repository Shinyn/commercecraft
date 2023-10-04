//File contains POST and GET handlers, creating a new billboard and returning all billboards respectively.

import { NextResponse } from "next/server";
import prismadb from "@/lib/db";
import { Billboard } from "@/components/dashboard/billboards/billboards";

export async function POST(
    req: Request,
    //TODO: Add params for extracting store when stores are implemented in dashboard
) {
    try {
        const body = await req.json()
        const { text, image, active }: Billboard = body.values
        let newBillboard=undefined
        //Remove activation from any previous billboards.
        if (active) {
            const updated = await prismadb.billboard.updateMany({
                where: { active: 1 },
                data: { active: 0 },
            })
                .then(async function (response) {
                   newBillboard = await prismadb.billboard.create({
                        data: {
                            text,
                            image,
                            active: 1
                        },
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            newBillboard = await prismadb.billboard.create({
                data: {
                    text,
                    image,
                    active:0
                },
            })

        }


        return NextResponse.json(newBillboard, { status: 201 })

    } catch (error) {
        console.log("api/billboards/POST", error)
        return new NextResponse("Something went wrong when trying to save your billboard", { status: 500 })
    }
}

export async function GET(
    req: Request,
) {
    try {
        const Billboards = await prismadb.billboard.findMany()
        return NextResponse.json(Billboards)

    } catch (error) {
        console.log("api/billboards/GET", error)
        return new NextResponse("Ooops, something went wrong when getting the billboards", { status: 500 })
    }
}

