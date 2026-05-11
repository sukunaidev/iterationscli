import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from './lib/supabase/client';
import { jwtVerify } from 'jose';


const key = new TextEncoder().encode(process.env.JWT_SECRET || '');
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  // try{
  //   // we would check the user's cookie, if they are authenticated, we allwo them to reach the dashboard page
  //   // otherwise kick them back to the home page.
  //   
  //   const supabase = createClient();

  //   // Get the cookie from the req
  //   const cookie_store = request.cookies;
  //   const token = cookie_store.get("auth-treat")?.value;
  //   console.log(cookie_store);

  //   console.log("got my token ", token);
  //   if(!token)  
  //     return NextResponse.redirect(new URL('/', request.url))

  //   const decoded = (await jwtVerify(token, key)).payload;
  //   const user_id = decoded.payload;

  //   const user_result = await supabase
  //                         .from("users")
  //                         .select("username")
  //                         .eq("user_id", user_id)
  //                         .single()
  //   if(user_result.count === 0)
  //     return NextResponse.redirect(new URL('/'))

  //   return NextResponse.next();
  // }catch(error){
  //   console.error("Server exception: proxy.ts could not handle the request:", error);

  //   return NextResponse.redirect(new URL('/'))
  // }
  
  return NextResponse.redirect(new URL('/', request.url));
}
 
export const config = {
  
  matcher: '/api/control',
}
