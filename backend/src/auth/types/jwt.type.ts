export type AccessToken = {
  access_token: string;
};

export type RefreshToken = {
  refresh_token: string;
};

export type Tokens = AccessToken & RefreshToken;

export type JwtPayload = {
  sub: number;
};
