import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client"

export async function GET(req: NextRequest) {
  try{
    const supabase = createClient();

    // Get the cookie from the req
    const cookie_store = req.cookies;
    const token = cookie_store.get("auth-treat");

    console.log("got my token ", token);

    const user_result = await supabase
                          .from("users")
                          .select("username").single()
    
    return NextResponse.json(
      user_result.data,
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
