import { NextRequest, NextResponse } from "next/server";





export async function GET(req:NextRequest) {
    const params = req.nextUrl.searchParams;
    console.log(params.get('name') );

    return NextResponse.json({ name: "User API is working" }, { status: 200 });
}


export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);

    return NextResponse.json({ name: "User created" }, { status: 201 });
}