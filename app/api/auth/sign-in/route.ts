import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt";

import { createClient } from "@/lib/supabase/client"

interface SignInParams {
  username: string;
  password_hash: string;
}


export async function POST(req: NextRequest){

  const supabase = createClient();

  try{
    const body = (await req.json()) as SignInParams;
    const { username, password_hash } = body;
    if(!(username && password_hash)){

      return NextResponse.json(
        { message: "Missing username or password" }, 
        { status: 400 } 
      );
    }
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if(error || !data){
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    } 

    if (await compare(data.password_hash, password_hash) ){
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      )
    }

    // create an http only cookie for the user
    return NextResponse.json(
      { message: "Success", user: data },
      { status: 200 }
    );
  }catch (error){
    console.error("Error in POST  sign-in route:", error)
    return NextResponse.json(
      { message: "Internal server error: Could not sign in" }, 
      { status: 500 } 
    );
  }
  
  return NextResponse.json({ message: "Success" }, { status: 200 } );
}
