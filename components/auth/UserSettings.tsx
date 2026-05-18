'use client'
import { useAuthenticate } from "@/hooks/use-authenticate"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog"
import { Input } from "../ui/input"
import { useState } from "react";


type Props = {
  open: boolean
  setOpen: (open_event: boolean) => void
}

function UserSettings({ open, setOpen }: Props) {
  const { user } = useAuthenticate();

  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");

  const updateUser = async () => {
    const payload = {
      username,
      password
    };

    try{
      const res = await fetch("/api/auth/update-user", {
        method: "PATCH",
        body: JSON.stringify(payload)
      });
      if(!res.ok){
        const body = (await res.json()) as { message: string };
        console.error("Could not update user information:", body.message);
      }else{
        setOpen(false);
      }
    } catch(error) {
      console.error("Serverside exception:", error);
    }
  }


  return (
    <div>
      <div>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger >
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Welcome to the Users Settings Page{user?.username}</AlertDialogTitle>
              <AlertDialogDescription>
                Username
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={user?.username} 
                />
                Password
                <Input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Exit</AlertDialogCancel>
              <AlertDialogAction onClick={updateUser}>Save</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>

        </AlertDialog>
      </div>
    </div>
  )

}

export default UserSettings;
