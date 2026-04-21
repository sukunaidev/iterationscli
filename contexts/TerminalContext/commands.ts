export type CommandName = 
  | "help"
  | "auth"

export type CommandArguement = {
  name: string;
  descriprion: string;
}

export type Command = {
  name: string;
  usage: string;
  icon?: string;
  handler?: () => void, // would need some kind of terminal context or way to control the overall app state?
  args?: CommandArguement[];
  sub_commands?: Record<string, Command>;
}

export const Commands: Record<CommandName, Command> = {
  auth: { 
    name: "auth",
    usage: "Used for sign-up/sign-in/sign-out of user accounts",
    sub_commands: {
      register: { 
        name: "register", 
        usage: "Used for creating an account",
        args: [{name: "username", descriprion: "<value>" }, { name: "password", descriprion: "<password>"  }]
      },
      login: { 
        name: "login", 
        usage: "Used for logging into an account",
        args: [{name: "username", descriprion: "<value>" }, { name: "password", descriprion: "<password>"  }]
      },
      logout: { 
        name: "logout", 
        usage: "Used for logging out of an account",
      },
    }
  },


  help: {
    name: "help",
    usage: "Lists the usage associated with a command"
  },
}
