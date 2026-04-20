import { TerminalContextValue } from "@/types/terminal";
import { TerminalContext } from "@/contexts/TerminalContext";
import { useContext } from "react";


export function UseTerminal(): TerminalContextValue {
  const ctx = useContext(TerminalContext);
  if(!ctx){
    console.error("Error: UseTerminal should be used within a Terminal Provider");
  }
  return ctx;
}
