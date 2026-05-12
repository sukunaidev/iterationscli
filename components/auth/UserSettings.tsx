'use client'
import { UseAuthenticate } from "@/hooks/use-authenticate"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

function UserSettingsPage() {
    const { user } = UseAuthenticate();

    return (
        <div>
            <div>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button>Temp Dialouge Open Button</Button>
                    </AlertDialogTrigger>
          {user?.username}
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Welcome to the Users Settings Page</AlertDialogTitle>
                            <AlertDialogDescription>
                                <div>
                                    Username
                                    <Input></Input>
                                    Password
                                    <Input></Input>
                                </div>
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
