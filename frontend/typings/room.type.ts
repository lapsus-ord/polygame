import { UserType } from '~/typings/user.type';

export type RoomType = {
  code: string;
  name: string;
  state: RoomState;
  creator: UserType;
  gameDefinition: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RoomWithUserCountType = RoomType & {
  userCount: number;
};

export type RoomWithUsersType = RoomType & {
  users: UserType[];
};

export const RoomState = {
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
};

export type RoomState = typeof RoomState[keyof typeof RoomState];
