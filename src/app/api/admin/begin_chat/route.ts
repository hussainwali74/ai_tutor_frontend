import { NextResponse } from "next/server";

import axios from "axios";


export async function POST(req: Request) {
    try {
        const body = await req.json();

        const headers = {
            "Content-Type": "application/json",
            accept: "application/json",
        };

        const data = body


        const url = process.env.BASE_URL + "/begin_chat";
        console.log('-----------------------------------------------------')
        console.log(`url :>>`, url)
        console.log('-----------------------------------------------------')

        const response = await axios.post(url, data, { headers: headers })

        return NextResponse.json({ data: response.data, status: 200 });

    } catch (error) {
        console.log("[begin chat error]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
