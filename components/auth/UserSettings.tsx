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

  const updateUser = async () => {

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
                <Input placeholder={user?.username} />
                Password
                <Input />
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
