'use client'
import React from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStateTracking } from "tldraw";


function SignUpPage() {
  const [username, setSignUpUsername] = useState("")
  const [password, setSignUpPassword] = useState("")
  const [miniTerminalCommand, setMiniTerminalCommand] = useState("")
  const [googleSignUpButtonClicked, setGoogleSignUpButtonClicked] = useState(false)
  const text = username != "" && password != "" ? "create terminal" : googleSignUpButtonClicked ? "create terminal via google " : ""
  const [terminalText, setTerminalText] = useState("")
  //setTerminalText(text)



  let handleSignUpUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpUsername(e.target.value);
  }

  let handleSignUpPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpPassword(e.target.value);
  }

  let handleMiniSignUpTerminal = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setTerminalText(e.target.value)
    setMiniTerminalCommand(e.target.value);
    if (miniTerminalCommand == "create terminal") {
      //take user into their dashboard
    }
  }


  return (
    <div>
      <div>
        <div className="flex justify-center mt-90">
          <Card className="w-full max-w-sm">
            <div className="flex justify-center">
              <div className="flex justify-center w-[80px] h-[60px] -mt-4">
                <img src="/logo--transparent.svg" />
              </div>
            </div>
            <CardHeader className="-mt-5">
              <CardTitle>Create your Terminal!</CardTitle>
              <CardDescription>Please carefully enter your information!</CardDescription>
            </CardHeader>
            <CardHeader><Separator /></CardHeader>
            <CardContent>
              <CardHeader>
                <CardTitle>Username</CardTitle>
                <Input
                  placeholder="TankaJahari"
                  value={username}
                  onChange={handleSignUpUsername}
                ></Input>
                <CardTitle>Password</CardTitle>
                <Input
                  placeholder="Pizzalover69"
                  type="password"
                  value={password}
                  onChange={handleSignUpPassword}
                ></Input>
              </CardHeader>
            </CardContent>
            <Input

              value={text}
              /* This means that if the username and password are not empty
                  then the terminal will have the value of create terminal
                  if the google sign up button is clicked then create teminal via google
                  else the string will be empty
              */
              onChange={handleMiniSignUpTerminal}
            ></Input>
            <CardDescription className="text-[10px] -mt-5">Write create terminal then press enter to sign into your terminal</CardDescription>
            <Button variant="ghost"
              onClick={() => {
                setGoogleSignUpButtonClicked(true)
              }}
            >{">create terminal via google"}</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;
