'use client'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { TerminalContextValue } from "@/types/terminal";
import { Commands, CommandName, Command as CommandType } from "./commands"
import UserSettings from "components/auth/UserSettings"
import { useRouter } from "next/navigation";

import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAuthenticate } from "@/hooks/use-authenticate";

export const TerminalContext = createContext<TerminalContextValue>({
  history: '',
  showUserSettings: false,
  active: false,
});

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

// used to both read the keyboard events + change ther terminal state 
function TerminalHotkey({ setTerminalState }: { setTerminalState: Dispatch<SetStateAction<TerminalContextValue>> }) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.altKey) {
        return
      }

      if (event.ctrlKey && event.key.toLowerCase() === "y") {
        //open the term
        setTerminalState((prev) => ({
          ...prev,
          active: !prev.active
        }))
      }

      // might not be needed
      if (isTypingTarget(event.target)) {
        return
      }

    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return null
}


interface TerminalContextProviderProps {
  children: React.ReactNode
}

function TerminalContextProvider({ children }: TerminalContextProviderProps) {
  const [terminalState, setTerminalState] = useState<TerminalContextValue>({
    active: false,
    history: '',
    showUserSettings: false,
  })

  const changeTerminalActive = (active?: boolean) => {
    if (active)
      setTerminalState((prev) => ({ ...prev, active }));
    else
      setTerminalState((prev) => ({ ...prev, active: !prev.active }))
  }


  return (
    <TerminalContext.Provider value={{
      active: false,
      history: "",
      showUserSettings: false,
      changeTerminalActive
    }}>
      <TerminalHotkey setTerminalState={setTerminalState} />
      {terminalState.active && <TerminalWindow setTerminalState={setTerminalState} terminalState={terminalState} />}
      <UserSettings open={terminalState.showUserSettings} setOpen={(open: boolean) => { setTerminalState((prev) => ({ ...prev, showUserSettings: open })) }} />
      {children}

    </TerminalContext.Provider>
  )
}


interface terminalWindowProps {
  terminalState: TerminalContextValue;
  setTerminalState: Dispatch<SetStateAction<TerminalContextValue>>;
};

function TerminalWindow({ terminalState, setTerminalState }: terminalWindowProps) {
  const router = useRouter();
  const { user, checkSession } = useAuthenticate();

  return (
    <div >
      <CommandDialog
        open={terminalState.active}
        onOpenChange={() => setTerminalState((prev) => ({ ...prev, active: !prev.active }))}
      >
        <Command>
          <CommandInput
            placeholder="Type a command or search..."

            onChangeCapture={(event) => {
              console.log(event.currentTarget.value)

            }
            } />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.keys(Commands).map((cmd) => {
              const command = Commands[cmd as CommandName];
              const sub_cmds = Object.values(command.sub_commands || {}) as CommandType[];
              const has_subs = sub_cmds.length !== 0
              const user_is_authenticated = Boolean(user);
              if (has_subs) {
                const visibleSubCommands = sub_cmds.filter((sub_cmd) => {
                  if (sub_cmd.auth_required) {
                    return user_is_authenticated;
                  }

                  return true;
                });

                if (visibleSubCommands.length === 0) {
                  return null;
                }

                return (
                  <CommandGroup heading={command.name} key={command.name}>
                    {visibleSubCommands.map((sub_cmd) => (
                      <CommandItem
                        key={sub_cmd.name}
                        onSelect={() =>
                          sub_cmd.handler?.({
                            terminalState,
                            setTerminalState,
                            checkSession,
                            router,
                          })
                        }
                      >
                        {sub_cmd.name}
                        <span className="text-gray-500">
                          {sub_cmd.usage}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              } else {
                return (
                  <CommandItem>{command.name}<span className="text-gray-500">{command.usage}</span></CommandItem>
                )
              }
            })}

          </CommandList>
        </Command>
      </CommandDialog >
    </div>

  )
}

export default TerminalContextProvider;
