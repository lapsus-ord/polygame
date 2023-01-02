import { Role } from '~/typings/roles.type';

export type UserType = {
  id: number;
  username: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};
