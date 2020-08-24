export type TAuthState = {
  readonly isLoggedIn: boolean;
};

export type TAccessToken = {
  access_token: string;
  created_at: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};
