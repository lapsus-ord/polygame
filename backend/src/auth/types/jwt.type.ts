export type AccessToken = {
  access_token: string;
};

export type Tokens = AccessToken & {
  refresh_token: string;
};

export type JwtPayload = {
  sub: number;
};
