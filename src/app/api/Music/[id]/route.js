import Music from "@/app/models/Music";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try{
    const { id } = params; 
    await Music.findByIdAndDelete(id); 
    return NextResponse.json({ message: "Music Deleted"}, {status: 200}); 
  } catch(error){
    return NextResponse.json({ message: "Error", error}, {status: 500});
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params; 
    const musicFound = await Music.findOne({_id: id}); 
    return NextResponse.json({ musicFound }, { status: 200}); 
  }
  catch (error) {
    return NextResponse.json({message: "Error", error}, {status:500});

  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const musicData = body.formData;

    const updatedMusic = await Music.findOneAndUpdate(
      { _id: id }, 
      { $set: musicData }, 
      { new: true } 
    );
    return NextResponse.json({ message: 'Music updated', updatedMusic }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating music', error }, { status: 500 });
  }
}