import axios from 'axios';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
	try {
		let url = (process.env.BASE_URL + '/change_model/')?.toString()

		const body = await req.json();
		url += body.model
		const headers = { 'Content-Type': 'application/json', 'accept': 'application/json' };
		if (url) {
			const response = await axios.get(url, { headers: headers });
			return NextResponse.json(response.data);
		}
		return NextResponse.json("no data");
	} catch (error) {
		console.log(error);
		return new NextResponse("something went wrong", { status: 500 })

	}
}