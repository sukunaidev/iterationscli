'use client'
import React from "react"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { createClient } from "@/lib/supabase/client"

async function UserSettingsPage() {
    const [username, setUsername] = useState('')



    React.useEffect(() => {
        async function loadUser() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            const userID = user?.id
        }




    })

    return (
        <div>
            <div>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button>Temp Dialouge Open Button</Button>
                    </AlertDialogTrigger>
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