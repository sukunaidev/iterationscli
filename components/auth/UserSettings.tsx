'use client'
import { UseAuthenticate } from "@/hooks/use-authenticate"
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
import { useEffect, useState } from "react"

function UserSettingsPage() {
  const [mounted, setMounted] = useState(false);

  const { user, checkSession } = UseAuthenticate();

  useEffect(() => {
    void checkSession?.();
    console.log("got my user:", user)
  }, [])

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  // if (!mounted) return null



  return (
    <div>
      <div>
        <AlertDialog>
          <AlertDialogTrigger>
            Temp Dialouge Open Button
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Welcome to the Users Settings Page{user?.username}</AlertDialogTitle>
              <AlertDialogDescription>
                  Username
                  <Input placeholder={user?.username} />
                  Password
                  <Input />
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel>Exit</AlertDialogCancel>
                <AlertDialogAction>Save</AlertDialogAction>
            </AlertDialogFooter>

          </AlertDialogContent>

        </AlertDialog>
      </div>
    </div>
  )

}

export default UserSettingsPage
