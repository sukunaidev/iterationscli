// First, we will fetch the username from the backend. 
//Then, we will read it back to the user
//Next, if they choose to change it, it will update the backend



//[id] is a dynamic route
//a params object will contain a dynamic value which will be ID which is a 
//dynamic route


import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client"

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();



    const { data, error } = await supabase
        .from("users")
        .select("username")
        //.eq("user_id", user_id)
        .single()
    //Single means wanting one row back of information, this is just for now, password will be needed 

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
