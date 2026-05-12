import { User } from "@/types/auth";

interface SignInWithPasswordProps{
  username: string;
  password: string;
}


interface SignUpWithPasswordProps{
  username: string;
  password: string;
}
class AuthClient {
  async SignInWithPassword({ username, password }: SignInWithPasswordProps): Promise<{ error?: string }>{
    try{
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({ username, password })
      })
      if(res.ok){
        return {  };
      }else{
        const body = await res.json() as { message: string };
        return { error: body.message }
      }
    }catch(error){
      console.error("Error in authClient when trying to sign in: ", error)
      return { error: error as string }
    }
  }

  async SignUpWithPassword({ username, password }: SignUpWithPasswordProps): Promise<{ error?: string }> {
    try{
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({ username, password })
      })

      if(res.ok){
        // may want to redirect to the dashboard, or call checksession to redirect us
        return {}
      }else{
        const body = await res.json() as { message: string };
        return { error: body.message }
      }
    }catch(error){
      return { error: error as string }
    }
  }

  async SignOut(): Promise<{ error?: string }> {
    try{
      // TODO: call the backend and clear the auth cookie

      return {};
    }catch(error){
      console.error("Error in authClient when trying to sign out: ", error)
      return { error: error as string }
    }
  }

  async GetUser(): Promise<{ user?: User; error?: string }>{
    try{
      // TODO: call the backend and retrieve the users session data
      const res = await fetch("/api/auth/authenticate", {
        method: "GET",
        credentials: "include"
      })
      
      if(res.ok){
        const body = (await res.json()) as { username: string }
        return { user: { username: body.username } };
      }else{
        const body = (await res.json()) as { message: string };
        return { error: body.message }
      }
        
    }catch(error){
      console.error("Error in authClient when trying to get user: ", error)
      return { error: error as string }
    }
  }

}

export const authClient = new AuthClient();
