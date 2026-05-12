'use client';

import { useState } from 'react';

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { authClient } from '@/lib/authClient';
import { useRouter } from 'next/navigation';
import { UseAuthenticate } from '@/hooks/use-authenticate';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keyword, setKeyword] = useState('');

  const router = useRouter();
  const { checkSession } = UseAuthenticate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (keyword !== 'signin') {
      alert('Type signin first');
      return;
    }


    try {
      const { error } = await authClient.SignInWithPassword({ password, username });
      if(error){
        console.log("Could not sign in:", error);
      }
      await checkSession?.();
      router.push("/dashboard");
      
    } catch(error){
      console.log("Could not sign in: Serverside exception: ", error);
    }
  };

  return (
    <div className="flex justify-center mt-90">
      <Card className="w-full max-w-sm">

        <div className="flex justify-center">
          <div className="flex justify-center w-[80px] h-[60px] -mt-4">
            <img src="/logo--transparent.svg" />
          </div>
        </div>

        <CardHeader className="-mt-5">
          <CardTitle>
            Sign Back Into Your Terminal
          </CardTitle>

          <CardDescription>
            Please carefully enter your information!
          </CardDescription>
        </CardHeader>

        <CardHeader>
          <Separator />
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <CardTitle className="mb-2">
                Username
              </CardTitle>

              <Input
                placeholder="TankaJahari"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />
            </div>

            <div>
              <CardTitle className="mb-2">
                Password
              </CardTitle>

              <Input
                placeholder="Pizzalover69"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            <div>
              <CardTitle className="mb-2">
                Command
              </CardTitle>

              <Input
                placeholder="signin"
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Enter
            </Button>
          </form>
        </CardContent>

        <CardDescription className="text-[10px] p-4 pt-0">
          Write signin then press enter to sign back
          into your terminal
        </CardDescription>

        <Button variant="link">
          Forgot Password?
        </Button>

      </Card>
    </div>
  );
}

export default SignInPage;
