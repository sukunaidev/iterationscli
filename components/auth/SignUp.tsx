"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input";
import { ReactiveInput } from "../ui/reactiveinput";
function SignUpPage() {

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Show Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>

                    <AlertDialogHeader>
                        <div className="grid place-items-center">
                            <AlertDialogTitle>Sign In Page</AlertDialogTitle>
                        </div>
                        <AlertDialogTitle>Is this information correct?</AlertDialogTitle>

                        <AlertDialogTitle>Username:</AlertDialogTitle>
                        <ReactiveInput>

                        </ReactiveInput>
                        <ReactiveInput></ReactiveInput>


                        <AlertDialogTitle>Password:</AlertDialogTitle>
                        <Input placeholder="chinesefood"></Input>
                        <AlertDialogDescription>
                            Please carefully look over the information you entered.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );

}

export default SignUpPage
