import { decode_token } from "@/lib/crypt";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { col } from "motion/react-client";

// CRUD
// POST IS CREATE
// GET IS READ
// PUT/PATCH IS UPDATE
// DELTE IS DELETE

export async function GET(req: NextRequest) {
  try {
    // first we must decode the user's token to retrive their user_id 
    // const data = { message: "data obtained", data: { board_id: 2, board_name: "testboard", columns: [] } }
    // return NextResponse.json(data)
    //Getting the user from the auth system
    /*const authRes = await fetch("/api/auth/authenticate", {
        method: "GET",
        headers: req.headers
    })

    if (!authRes.ok) //this means if there is no 200
    {
        return NextResponse.json(
            { message: "Unauthrized" },
            { status: 401 }
        )
    }

    const authData = await authRes.json()
    const userID = authData.userId ?? authData.username;*/

    //Creating a supabase client
    const { user_id } = await decode_token(req);
    const supabase = createClient();
    //Users are only allowed one board so we will get one board
    const { data: board, error: boardError } = await supabase
      .from("boards")
      .select("*")
      .eq("user_id", user_id)
      .single();
    // This means that from the table boards select all the boards tied to the userid and return it in a single line

    if (boardError || !board) {
      return NextResponse.json(
        { message: "Board Not Found" },
        { status: 404 }
      )
    }
    //If there is a board error or there is no board data, return a json response 404
    //Gets all the columns tied to a board
    const { data: columns } = await supabase
      .from("columns")
      .select("*")
      .eq("board_id", board.board_id);

    //This is getting all tickets that belong to a set of columns 
    const { data: tickets } = await supabase
      .from("tickets")
      .select("*")
      .in("column_id", (columns ?? []).map((c) => c.column_id))

    const structuredBoard = {
      ...board,
      columns: (columns ?? []).map((col) => ({
        ...col,
        tickets: (tickets ?? []).filter(
          (ticket) => ticket.column_id === col.column_id
        ),
      })),
    }
    console.log(columns, tickets, structuredBoard)


    return NextResponse.json({
      message: "data obtained",
      data: structuredBoard,
    })

  } catch (error) {
    console.error("Serverside exception occurred in GET kamako:", error);

    return NextResponse.json(
      { message: "Sever error retrieving kamako:" },
      { status: 500 }
    )
  }
}
