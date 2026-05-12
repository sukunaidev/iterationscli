import { NextRequest, NextResponse } from "next/server";

// CRUD
// POST IS CREATE
// GET IS READ
// PUT/PATCH IS UPDATE
// DELTE IS DELETE

export async function GET(req: NextRequest) {
    try {
        // first we must decode the user's token to retrive their user_id 
        const data = { message: "data obtained", data: { board_id: 2, board_name: "testboard", columns: [] } }
        return NextResponse.json(data)
    } catch (error) {
        console.error("Serverside exception occurred in GET kamako:", error);

        return NextResponse.json(
            { message: "Sever error retrieving kamako:" },
            { status: 500 }
        )
    }
}