'use client';

import React from "react";

import { useRouter } from "next/navigation";

import {
  UseAuthenticate
} from "@/hooks/use-authenticate";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { user, error, is_loading } = UseAuthenticate(); // remove checkSession

  React.useEffect(() => {
    if (is_loading) return;
    if (!user || error) {
      router.replace("/");
    }
  }, [user, error, is_loading, router]);

  if (is_loading || !user) {
    return null;
  }

  return <>{children}</>;
}
