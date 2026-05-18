import React from "react";
import { authClient } from "@/lib/authClient";
import { CommandHandler } from "../../commands";

export const RegisterHandler: CommandHandler = ({ setTerminalState, router, terminalState }) => {
  // do logic
  router?.push("/auth/sign-up")
  console.log("creating a login dialog");
}

export const LogoutHandler: CommandHandler = ({ setTerminalState, router, terminalState }) => {
  // do logic
  authClient.SignOut();
}

export const LoginHandler: CommandHandler = ({ setTerminalState, router, terminalState }) => {
  // do logic
  router?.push("/auth/sign-in")
}

export const SettingHandler: CommandHandler = ({ setTerminalState, router, terminalState }) => {
  setTerminalState((prev) => ({
    ...prev,
    showUserSettings: !prev.showUserSettings
  }) )
}

