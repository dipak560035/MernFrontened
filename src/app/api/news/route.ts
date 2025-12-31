
import { connectDb } from "@/lib/db";
import { News } from "@/models/News";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDb();
  const body = await req.json();
  try {
    await News.create(body);
    return NextResponse.json({ message: 'News added successfully' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Failed to add news' }, { status: 500 });
  }


}