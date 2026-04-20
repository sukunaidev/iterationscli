

export interface AuthenticateContextValue {
  user: User | null;
  error: string | null;
  is_loading: boolean;
  expires_at: number | null;
  checkSession?: () => Promise<void>
}

export interface User {
  username: string;

};
