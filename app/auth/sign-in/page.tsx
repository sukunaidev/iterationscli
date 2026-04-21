import { Input } from "@/components/ui/input";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "radix-ui";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { link } from "node:fs";

function SignInPage() {
  return (
    <div>
      <div className="flex justify-center mt-90">
        <Card className="w-full max-w-sm">
          <div className="flex justify-center">
            <div className="flex justify-center w-[80px] h-[60px] -mt-4">
              <img src="/logo--transparent.svg" />
            </div>
          </div>
          <CardHeader className="-mt-5">
            <CardTitle>Sign Back Into Your Terminal</CardTitle>
            <CardDescription>Please carefully enter your information!</CardDescription>
          </CardHeader>
          <CardHeader><Separator /></CardHeader>
          <CardContent>
            <CardHeader>
              <CardTitle>Username</CardTitle>
              <Input placeholder="TankaJahari"></Input>
              <CardTitle>Password</CardTitle>
              <Input placeholder="Pizzalover69" type="password"></Input>
            </CardHeader>

          </CardContent>
          <Input></Input>
          <CardDescription className="text-[10px] -mt-5">Write signin then press enter to sign back into your terminal</CardDescription>
          <Button variant="link">Forgot Password?</Button>
        </Card>
      </div>
    </div>
  )
}

export default SignInPage;
