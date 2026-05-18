import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try{
    const res = NextResponse.json(
      { message: "Success signing user out" },
      { status: 200 }
    );

    res.cookies.delete("auth-treat");
    return res;
  }catch(error){
    return NextResponse.json(
      { message: "Error could not sign user out", error: error },
      { status: 500 }
    )
  }
}
