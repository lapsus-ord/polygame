import { Role } from '@prisma/client';

export type FilteredUser = {
  id: number;
  username: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};
