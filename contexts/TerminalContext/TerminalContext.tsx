'use client'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { TerminalContextValue } from "@/types/terminal";

import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

export const TerminalContext = createContext<TerminalContextValue>({
  history: '',
  active: false
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
    history: ''
  })



  return (
    <TerminalContext.Provider value={{
      active: false,
      history: ""
    }}>
      <TerminalHotkey setTerminalState={setTerminalState} />
      {terminalState.active && <TerminalWindow setTerminalState={setTerminalState} terminalState={terminalState} />}
      {children}
    </TerminalContext.Provider>
  )
}


interface terminalWindowProps {
  terminalState: TerminalContextValue;
  setTerminalState: Dispatch<SetStateAction<TerminalContextValue>>;
};

function TerminalWindow(props: terminalWindowProps) {

  const [command, setCommand] = useState("")


  return (
    <div >
      <CommandDialog
        open={props.terminalState.active}
        onOpenChange={() => props.setTerminalState((prev) => ({ ...prev, active: !prev.active }))}
      >
        <Command className="">
          <CommandInput
            placeholder="Type a command or search..."

            onChangeCapture={(event) => {
              console.log(event.currentTarget.value)

            }
            } />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Auth">
              <CommandItem>signin</CommandItem>
              <CommandItem>signup</CommandItem>

            </CommandGroup>
            <CommandGroup heading="Command Suggestions">
              <CommandItem>help</CommandItem>
              <CommandItem>create</CommandItem>
              <CommandItem>kamako create</CommandItem>
              <CommandItem>edit</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>Profile</CommandItem>
              <CommandItem>Billing</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog >
    </div>

  )
}

export default TerminalContextProvider;
