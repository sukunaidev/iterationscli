import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client"
import { decode_token } from "@/lib/crypt";

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();
    
    const { user_id } = await decode_token(req);
    const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("user_id", user_id)
        .single()

    if (error || !data) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 401 }
      )
    }
    return NextResponse.json(data);
  }
  catch (error) {
    console.error("Error In GET update-user route:", error)
    return NextResponse.json(
      { message: "Error with retrival inside of the server" },
      { status: 500 }
    )
  }

}
