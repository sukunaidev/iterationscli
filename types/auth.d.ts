
export interface AuthenticateContextValue {
  user: User | null;
  error: string | null;
  is_loading: boolean;
  checkSession?: () => Promise<void>
}

export interface User {
  username: string;
};

export interface AuthPayload {
  user_id: number,
}
