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
    
  // the check session function is the behavior that can be used globally across the application, to verify if a user is authenticated whenever needed. 
  // In addition it refreshes user object data with the latest data, otherwise it will clear the USER object and set any error it runs into.
  const checkSession = async () => {
    try{
      // using the authClient class we call the GetUser function to get user data
      const { expires_at, user, error } = await authClient.GetUser();

      // if we do NOT receive a user object and get an ERROR object, we must clear the authentication context. (something in the auth process/serverside has failed)
      if(!user && error){
        // we can more specifically set the auth state, based on the error (if the cookie expired, etc.)
        console.warn("Error: User is not authenticated: ", error)
        
        // now we clear the user object, and setting a GLOBAL AUTH ERROR so the rest of the applicaiton is aware
        setAuth((prev) => ({ 
          ...prev,
          is_loading: false,
          expires_at: null,
          user: null,
          error: error,
        }));

      }

      // otherwise if we recieve both a USER OBJECT and the timestamp that the USER OBJECT WILL EXPIRE AT, we must set them inside of the context
      if(user && expires_at){

        setAuth((prev) => ({
          ...prev,
          user: user ?? null,
          error: null,
          expires_at: expires_at ?? null,
          is_loading: false
        }));

      } else{
        // if we DONT get a USER or the EXPIRAY TIMESTAMP, then we know yet again something went wrong in the auth process, set an error state.
        console.error("User: Something went wrong authenticating user: User or expires_at was null", { user, expires_at })

        setAuth((prev) => ({ 
          ...prev,
          is_loading: false,
          expires_at: null,
          user: null,
          error: "Auth process broke, please try again later.",
        }));
      }

      // Again something may have failed in the authClient.GetUser function, maybe the user's internet went out, or the server is down (HTTP status code 500).
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

