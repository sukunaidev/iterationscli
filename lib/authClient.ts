import { User } from "@/types/auth";

interface SignInWithPasswordProps{
  username: string;
  password: string;
}

class AuthClient {
  async SignInWithPassword({ username, password }: SignInWithPasswordProps): Promise<{ error?: string }>{
    try{
      // TODO: call the backend and retrieve the auth cookie
      return {};
    }catch(error){
      console.error("Error in authClient when trying to sign in: ", error)
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

  async GetUser(): Promise<{ expires_at?: number, user?: User; error?: string }>{
    try{
      // TODO: call the backend and retrieve the users session data
      return {};
    }catch(error){
      console.error("Error in authClient when trying to get user: ", error)
      return { error: error as string }
    }
  }

}

export const authClient = new AuthClient();
