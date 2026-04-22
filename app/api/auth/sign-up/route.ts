import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { hashSync } from "bcrypt"
import { SignJWT } from "jose";

interface SignUpWithPassowrdProps{
  username: string;
  password: string;
}

const key = new TextEncoder().encode(process.env.JWT_SECRET || '');


export async function POST(req: NextRequest){
  try{
    const supabase = createClient();
    
    const { password, username } = await req.json() as SignUpWithPassowrdProps
    
    const password_hash = hashSync(password, 10);

    const user_result = await supabase
                          .schema("iterations")
                          .from("users")
                          .insert({ username, password: password_hash })
                          .select("user_id");

    if (user_result.error){
      console.log("Could not sign user up: ", user_result.error)
      return NextResponse.json({ message: "Could not sign user up" }, { status: 500 })
    }
    
    const user_id = user_result.data

    console.log("user_id:", user_id)

    const token = await new SignJWT({ user_id })
                        .setProtectedHeader({ alg: "HS256" })
                        .setIssuedAt()
                        .setExpirationTime("6 Hours")
                        .sign(key);

    const res = NextResponse.json({ message: "Sign up success" })
    res.cookies.set("auth-treat", token, { expires: 6 * 60 * 60 });

    return res;
  }catch(error){
    console.log("Error signing user up:", error)
    return NextResponse.json({ message: "Could not sign user up" }, { status: 500 })
  }
}
