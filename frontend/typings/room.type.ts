import { UserType } from '~/typings/user.type';
import { Role } from '~/typings/roles.type';

export type RoomType = {
  code: string;
  name: string;
  state: RoomState;
  creator: UserType;
  gameDefinition: string;
  createdAt: string;
  updatedAt: string;
};

export type RoomWithUserCountType = RoomType & {
  userCount: number;
};

export type AdminRoomType = RoomWithUserCountType & {
  isPublic: boolean;
};

export type RoomWithUsersType = RoomType & {
  users: RoomUser[];
};

export type RoomUser = { id: number; username: string; role: Role };

export const RoomState = {
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
};

export type RoomState = typeof RoomState[keyof typeof RoomState];
