import { Prisma, RoomState } from '@prisma/client';

export type RoomType = {
  code: string;
  name: string;
  state: RoomState;
  creator: { id: number; username: string };
  gameDefinition: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RoomsType = Array<RoomType & { nbOfUsers: number }>;

export type RoomWithUsersType = RoomType & {
  users: { id: number; username: string }[];
};

export type PrismaRoomType = Prisma.RoomGetPayload<{
  include: {
    creator: { select: { id: boolean; username: boolean } };
    game: { select: { definitionSlug: boolean } };
    users: { select: { user: { select: { id: boolean; username: boolean } } } };
    _count: { select: { users: boolean } };
  };
}>;
