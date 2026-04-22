
export interface TerminalContextValue {
  history: string;
  active: boolean;
  changeTerminalActive?: (a?: boolean) => void;
};

