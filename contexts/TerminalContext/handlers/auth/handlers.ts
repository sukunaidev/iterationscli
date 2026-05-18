import React from "react";
import { authClient } from "@/lib/authClient";
import { CommandHandler } from "../../commands";

export const RegisterHandler: CommandHandler = ({ router }) => {
  // do logic
  router?.push("/auth/sign-up")
  console.log("creating a login dialog");
}

export const LogoutHandler: CommandHandler = async ({ checkSession, router }) => {
  // do logic
  await authClient.SignOut();
  void checkSession?.();
  router?.push("/");
}

export const LoginHandler: CommandHandler = ({ router }) => {
  // do logic
  router?.push("/auth/sign-in")
}

export const SettingHandler: CommandHandler = ({ setTerminalState }) => {
  setTerminalState((prev) => ({
    ...prev,
    showUserSettings: !prev.showUserSettings
  }) )
}

