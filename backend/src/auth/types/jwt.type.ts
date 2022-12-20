import { Role } from '@prisma/client';

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type JwtPayload = {
  sub: number;
  username: string;
  role: Role;
};
