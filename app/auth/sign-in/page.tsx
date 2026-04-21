import { Input } from "@/components/ui/input";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "radix-ui";
import { Separator } from "@/components/ui/separator";

function Page() {
  return (
    <div>
      <div className="flex justify-center mt-90">


        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Sign Back Into Your Terminal</CardTitle>
            <CardDescription>Please carefully enter your information!</CardDescription>

          </CardHeader>
          <CardHeader><Separator /></CardHeader>
          <CardContent>
            <CardHeader>
              <CardTitle>Username</CardTitle>
              <Input placeholder="hello"></Input>
              <CardTitle>Password</CardTitle>
              <Input placeholder="hello"></Input>
            </CardHeader>

          </CardContent>
          <Input></Input>
          <CardDescription className="text-[10px] -mt-5">Write signin then press enter to sign back into your terminal</CardDescription>
        </Card>
      </div>
    </div>
  )
}

export default Page;
