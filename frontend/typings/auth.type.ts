export type TokensType = {
  access_token: string;
};

export type JwtDataType = {
  sub: number;
  iat: number; // Issued at
  exp: number; // Expiration time
};

export type ResultDataType = {
  status: number;
  messages: string[];
};
