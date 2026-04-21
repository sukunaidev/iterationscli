import { Input } from "@/components/ui/input";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function Page() {
  return (
    <div>
      <div className="flex justify-center">


        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Sign Back Into Your Terminal</CardTitle>
            <Input placeholder="hello"></Input>
            <Input placeholder="hello"></Input>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default Page;
