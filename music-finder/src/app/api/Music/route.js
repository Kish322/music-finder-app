import Music from "../../models/Music";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const musicData = body.formData; 
    await Music.create(musicData);
    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const music = await Music.find(); 
    return NextResponse.json({ music }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

