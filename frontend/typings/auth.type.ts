import { Role } from '~/typings/roles.type';

export type TokensType = {
  access_token: string;
  refresh_token: string;
};

export type JwtDataType = {
  sub: number;
  username: string;
  role: Role;
  iat: number; // Issued at
  exp: number; // Expiration time
};

export type ResultDataType = {
  status: number;
  messages: string[];
};
