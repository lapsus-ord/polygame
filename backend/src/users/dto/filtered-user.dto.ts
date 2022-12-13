import { Role } from '@prisma/client';

export type FilteredUser = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  role: Role;
};
