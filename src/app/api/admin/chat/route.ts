import { NextRequest, NextResponse } from "next/server";

import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const message = req.nextUrl.searchParams.get("message");
        const url = process.env.BASE_URL + "/chat?message=" + message;
        const headers = {
            "Content-Type": "application/json",
            accept: "application/json",
        };
        const response = await axios.post(url, { headers: headers })
        return NextResponse.json({ data: response.data, status: 200 });

    } catch (error) {
        console.log("[begin chat error]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
