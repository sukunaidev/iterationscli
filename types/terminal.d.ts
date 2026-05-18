
export interface TerminalContextValue {
  history: string;
  active: boolean;
  showUserSettings: boolean;
  changeTerminalActive?: (a?: boolean) => void;
};

