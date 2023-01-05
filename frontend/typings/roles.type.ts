export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export type Role = typeof Role[keyof typeof Role];
