import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LoginHandler, LogoutHandler, RegisterHandler, SettingHandler } from "./handlers/auth/handlers";
import { TerminalContextValue } from "@/types/terminal";
import { Dispatch, SetStateAction } from "react";

export type CommandName =
  | "help"
  | "auth"
// | "settings"

export type CommandArguement = {
  name: string;
  descriprion: string;
}

export type CommandHandlerProps = { terminalState: TerminalContextValue, setTerminalState:  Dispatch<SetStateAction<TerminalContextValue>>, router?: AppRouterInstance };
export type CommandHandler = (props: CommandHandlerProps) => void;

export type Command = {
  name: string;
  usage: string;
  auth_required: boolean;
  icon?: string;
  handler?: CommandHandler,
  args?: CommandArguement[];
  sub_commands?: Record<string, Command>;
}

export const Commands: Record<CommandName, Command> = {
  auth: {
    name: "auth",
    usage: "Used for sign-up/sign-in/sign-out of user accounts",
    auth_required: false, 
    sub_commands: {
      register: {
        name: "register",
        usage: "Used for creating an account",
        auth_required: false, 
        args: [{ name: "username", descriprion: "<value>" }, { name: "password", descriprion: "<password>" }],
        handler: RegisterHandler
      },
      login: {
        name: "login",
        usage: "Used for logging into an account",
        auth_required: false, 
        args: [{ name: "username", descriprion: "<value>" }, { name: "password", descriprion: "<password>" }],
        handler: LoginHandler
      },
      logout: {
        name: "logout",
        usage: "Used for logging out of an account",
        auth_required: false, 
        handler: LogoutHandler
      },
      settings: {
        name: "settings",
        usage: "Used for changing account information",
        auth_required: true, 
        handler: SettingHandler
      }
    }
  },
  help: {
    name: "help",
    usage: "Lists the usage associated with a command",
    auth_required: false, 
  },
}
