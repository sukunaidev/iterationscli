import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { hashSync } from "bcrypt"
import { SignJWT } from "jose";
import { col, sup } from "motion/react-client";
import { error } from "node:console";

interface SignUpWithPassowrdProps {
  username: string;
  password: string;
}

const key = new TextEncoder().encode(process.env.JWT_SECRET || '');


export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();

    const { password, username } = await req.json() as SignUpWithPassowrdProps

    const password_hash = hashSync(password, 10);

    const user_result = await supabase
      .schema("iterations")
      .from("users")
      .insert({ username, password: password_hash })
      .select("user_id");

    if (user_result.error) {
      console.log("Could not sign user up: ", user_result.error)
      return NextResponse.json({ message: "Could not sign user up" }, { status: 500 })
    }

    const user_id = user_result.data[0].user_id

    console.log("user_id:", user_id)


    //create a board for the user
    const board_result = await supabase
      .schema("iterations")
      .from("boards")
      .insert({ user_id: user_id, name: "starterBoard" })
      .select("board_id")
      .single()


    // if (board_result.error) {
    //   console.log("Could not create board:", board_result.error);

    //   return NextResponse.json(
    //     { message: "Could not create board" },
    //     { status: 500 }
    //   );
    // }

    const board_id = board_result.data?.board_id;
    console.log("board_id:", board_id)

    const column_result = await supabase
      .schema("iterations")
      .from("columns")
      .insert({ board_id: board_id, column_header: "To Do" })
      .select("column_id")
      .single()


    if (column_result.error) {
      console.error("couldnt create a column", column_result.error)
      return NextResponse.json(
        { message: " Couldnt create a column" },
        { status: 500 }
      )
    }
    const column_id = column_result?.data?.column_id


    const ticket_result = await supabase
      .schema("iterations")
      .from("tickets")
      .insert({ column_id: column_id, ticket_header: "Finish Wesbite" })

    if (ticket_result.error) {
      console.error("couldnt create a ticket:", ticket_result.error)
      return NextResponse.json(
        { message: " Couldnt create a ticket" },
        { status: 500 }
      )
    }



    const token = await new SignJWT({ user_id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("6 Hours")
      .sign(key);

    const res = NextResponse.json({ message: "Sign up success" })
    res.cookies.set("auth-treat", token, { httpOnly: true, maxAge: 6 * 60 * 60 });

    return res;


  } catch (error) {
    console.log("Error signing user up:", error)
    return NextResponse.json({ message: "Could not sign user up" }, { status: 500 })
  }
};
