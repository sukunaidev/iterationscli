import { NextRequest, NextResponse } from "next/server";

import {} from "@/lib/supabase/client"

interface SignInParams {
  username: string;
  password_hash: string;
}

export function POST(req: NextRequest){
  const body = req.body() as SignInParams;

  try{
    
  }catch (error){
    console.error("Error in POST  sign-in route:", error)
    return NextResponse.json({ message: "Internal server error: Could not sign in" }, { status: 500 } );
  }
  
  return NextResponse.json({ message: "Success" }, { status: 200 } );
}
