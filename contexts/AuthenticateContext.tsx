'use client';
import { AuthenticateContextValue } from "@/types/auth";
import { createContext, ReactNode, useState } from "react";
import { authClient } from "@/lib/authClient";

const AuthenticateContext = createContext<AuthenticateContextValue>({
  user: null,
  error: null,
  is_loading: false,
  expires_at: null,
});

interface AuthenticateProviderProps{
  children: ReactNode
};

export function AuthenticateProvider({ children }: AuthenticateProviderProps) {
  const [auth, setAuth] = useState<AuthenticateContextValue>({
    user: null,
    error: null,
    is_loading: false,
    expires_at: null,
  })
    
  const checkSession = async () => {
    try{
      const { expires_at, user, error } = await authClient.GetUser();
      if(!user && error){
        // we can more specifically set the auth state, based on the error (if the cookie expired, etc.)
        console.warn("Error: User is not authenticated: ", error)

        setAuth((prev) => ({ 
          ...prev,
          is_loading: false,
          expires_at: null,
          user: null,
          error: error,
        }));

      }
      if(user && expires_at){

        setAuth((prev) => ({
          ...prev,
          user: user ?? null,
          error: null,
          expires_at: expires_at ?? null,
          is_loading: false
        }));

      } else{
        console.error("User: Something went wrong authenticating user: User or expires_at was null", { user, expires_at })

        setAuth((prev) => ({ 
          ...prev,
          is_loading: false,
          expires_at: null,
          user: null,
          error: "Auth process broke, please try again later.",
        }));
      }

    } catch(error) {
      console.error("Failed to authenticate user: ", error)

      setAuth((prev) => ({ 
        ...prev,
        is_loading: false,
        expires_at: null,
        user: null,
        error: "Error occured in authClient GetUser."
      }));
    }
  }

  return (
    <AuthenticateContext.Provider value={{
      ...auth,
      checkSession
    }}>
      {children}
    </AuthenticateContext.Provider>
  )
};

