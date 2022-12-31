import { UserType } from '~/typings/user.type';

export type RoomType = {
  code: string;
  name: string;
  state: RoomState;
  creator: UserType;
  gameDefinition: string;
  nbOfUsers: number;
  createdAt: Date;
  updatedAt: Date;
};

export const RoomState = {
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
};

export type RoomState = typeof RoomState[keyof typeof RoomState];
