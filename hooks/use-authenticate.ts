import { AuthenticateContextValue } from "@/types/auth";
import { AuthenticateContext } from "@/contexts/AuthenticateContext"
import { useContext } from "react";


export function useAuthenticate(): AuthenticateContextValue {
  const ctx = useContext(AuthenticateContext);
  if (!ctx) {
    console.error("Error: UseAuthenticate should be used within a Authenticate Provider");
  }
  return ctx;
}
