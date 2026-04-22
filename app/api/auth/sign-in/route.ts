import { NextRequest, NextResponse } from "next/server";
import { compareSync } from "bcrypt";

import { createClient } from "@/lib/supabase/client"
import { SignJWT } from "jose";

interface SignInParams {
  username: string;
  password: string;
}

const key = new TextEncoder().encode(process.env.JWT_SECRET || '');

export async function POST(req: NextRequest){

  const supabase = createClient();

  try{
    const body = (await req.json()) as SignInParams;
    const { username, password } = body;
    if(!(username && password)){

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

    console.log("data", data, password, compareSync(password, data.password))
    if (!compareSync(password, data.password) ){
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      )
    }

    // create an http only cookie for the user
    const res = NextResponse.json(
      { message: "Success signing user in" },
      { status: 200 }
    );

    const token = await new SignJWT({ user_id: data.user_id })
                        .setProtectedHeader({ alg: "HS256" })
                        .setIssuedAt()
                        .setExpirationTime("6 Hours")
                        .sign(key);

    res.cookies.set("auth-treat", token, { expires: 6 * 60 * 60 });

    return res;
  }catch (error){
    console.error("Error in POST  sign-in route:", error)
    return NextResponse.json(
      { message: "Internal server error: Could not sign in" }, 
      { status: 500 } 
    );
  }
}
