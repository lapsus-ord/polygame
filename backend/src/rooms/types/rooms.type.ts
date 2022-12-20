import { RoomState } from '@prisma/client';

export type RoomType = {
  code: string;
  name: string;
  state: RoomState;
  creator: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GameRoomType = RoomType & {
  game: string;
  nbOfUsers: number;
  nbOfTeams: number;
};
