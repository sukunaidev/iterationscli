import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client"
import { jwtVerify } from "jose"
import { decode_token } from "@/lib/crypt";

const key = new TextEncoder().encode(process.env.JWT_SECRET || '');

export async function GET(req: NextRequest) {
  try{
    const supabase = createClient();

    const { user_id } = await decode_token(req);

    const user_result = await supabase
                          .from("users")
                          .select("username")
                          .eq("user_id", user_id)
                          .single()

    const username = user_result.data?.username;
    return NextResponse.json(
      { username },
      { status: 200 }
    );

  } catch(error) {
    console.log("Serverside exception occurred in GET:", error)
    return NextResponse.json(
      { message: "Error could not GET user." },
      { status: 500 }
    );
  }
}
