import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client"
import { decode_token, hash_password } from "@/lib/crypt";

interface RequestBody {
  username?: string;
  password?: string;
};

export async function PATCH(req: NextRequest) {
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
    const { password, username } = await req.json() as RequestBody;
    console.log("got some update params:", password, username);

    if (username){
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("username", username)
      if(data?.length == 1){
        return NextResponse.json(
          { message: "Username is already taken" },
          { status: 400 }
        )
      } else if(error) {
        console.error("Could not PATCH user's username:", error);
        return NextResponse.json(
          { message: "Could not update your username", error: error },
          { status: 400 }
        )
      }else{
        const { data: data2 , error: error2 } = await supabase
          .from("users")
          .update({ username })
          .eq("user_id", user_id)
        if(error2){

          console.error("Could not CHANGE user's username:", error2);
          return NextResponse.json(
            { message: "Could not update your username", error: error2 },
            { status: 400 }
          )
        }
      }
    }

    if (password){
      const password_hash = await hash_password(password);
      const { data, error } = await supabase
        .from("users")
        .update({ password: password_hash})
        .eq("user_id", user_id);
      if (error){ 
          console.error("Could not CHANGE user's password:", error);
          return NextResponse.json(
            { message: "Could not update your password", error },
            { status: 400 }
          )
      }
    }
    return NextResponse.json(
      { message: "Sucessfully updated your information" }
    );
  }
  catch (error) {
    console.error("Error In GET update-user route:", error)
    return NextResponse.json(
      { message: "Error with retrival inside of the server" },
      { status: 500 }
    )
  }
}
