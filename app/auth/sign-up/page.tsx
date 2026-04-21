import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


function SignUpPage() {
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
                <Input placeholder="TankaJahari"></Input>
                <CardTitle>Password</CardTitle>
                <Input placeholder="Pizzalover69" type="password"></Input>
              </CardHeader>

            </CardContent>
            <Input type="search"></Input>
            <CardDescription className="text-[10px] -mt-5">Write create terminal then press enter to sign back into your terminal</CardDescription>
            <Button variant="ghost">{">create terminal cd google"}</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;
