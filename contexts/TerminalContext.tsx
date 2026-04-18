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

import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

export interface TerminalContextValue {
  history: string;
  active: boolean;
};

const TerminalContext = createContext<TerminalContextValue>({
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

      if (event.ctrlKey && event.key.toLowerCase() === "y"){
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


interface TerminalContextProviderProps{
  children: React.ReactNode
}

function TerminalContextProvider({ children }: TerminalContextProviderProps){
  const [terminalState, setTerminalState] = useState<TerminalContextValue>({
    active: false,
    history: ''
  })

  return (
    <TerminalContext.Provider value={{
      active: false,
      history: ""
    }}>
      <TerminalHotkey setTerminalState={setTerminalState}/>
      {terminalState.active && <TerminalWindow />}
      {children}
    </TerminalContext.Provider>
  )
}

function TerminalWindow(){
  
  return (
    <Command className="max-w-sm rounded-lg border">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default TerminalContextProvider;
