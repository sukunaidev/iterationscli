import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function PUT(req: NextRequest) {
  try {
    const { board_id, column_id, column_header } = await req.json();
    console.log(board_id, column_id, column_header)
    const supabase = createClient();
    //First we check if the column ID exist
    //IF it doesnt, we will create a new column with the provided ID generated
    //To avoid multiple columns being made when updating only one column
    const { data: columnData, error: columnError } = await supabase
      .from("columns")
      .select("*")
      .eq("column_id", column_id)
      .single()


    console.log(columnData, columnError)

    if (columnData) {
      console.log("Column Exist, Update the information")

      const { data: updateColumn, error } = await supabase
        .from("columns")
        .update({ column_header: column_header })
        .eq("board_id", board_id)
        .eq("column_id", column_id)
        .select()
        .single()
      if (error) {
        console.error("Error creating column:", error)
      }
      else {
        console.log("UpdatedTicket", updateColumn)
      }
    }
    else if (!columnData && columnError) {
      console.error("Column with ID doesnt exist, Creating column and inserting ID")

      const { data: createdColumn, error } = await supabase
        .from("columns")
        .insert({ board_id: board_id, column_id: column_id, column_header: column_header })
        .select()
        .single()

      if (error) {
        console.error("Error with creating a new column", error)
        return NextResponse.json(
          { message: "Error with creating column" },
          { status: 500 }
        )
      }
      else {
        console.log("Created a new column with information", createdColumn)
      }
    }
    return NextResponse.json(
      { message: "ColumnCreated" },
      { status: 200 }
    )
  }
  catch (error: any) {
    console.error("There was an error Updating and/or Creating a column:", error)
    console.error("MESSAGE:", error?.message);
    console.error("DETAIL:", error?.details);
    return NextResponse.json(
      { message: "Error with creating or updating column" },
      { status: 500 }
    )
  }
}