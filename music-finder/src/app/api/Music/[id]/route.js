import Music from "@/app/models/Music";
import { NextResponse } from "next/server";

export async function DELETE({ params }) {
  try{
    const { id } = params; 
    await Music.findByIdAndDelete(id); 
    return NextResponse.json({ message: "Music Deleted"}, {status: 200}); 
  } 
  catch(error){
    return NextResponse.json({ message: "Error", error}, {status: 500});
  }
}