import { AuthPayload } from "@/types/auth";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose"

const key = new TextEncoder().encode(process.env.JWT_SECRET || '');

export async function decode_token(req: NextRequest): Promise<AuthPayload> {
  const cookie_store = req.cookies;
  const token = cookie_store.get("auth-treat")?.value as string;

  const decoded = await jwtVerify(token, key);

  const { user_id } = decoded.payload as { user_id: number }

  return { user_id: user_id };
}

export async function sign_token(): Promise<void> {
  // for now returns nothing, in the furture will return the token
  // as well as cookie config settings (httpOnly, maxAge, sameSite, etc...)
}
