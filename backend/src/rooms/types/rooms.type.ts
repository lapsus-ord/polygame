import { Prisma, Role, RoomState } from '@prisma/client';

type RoomUserType = { id: number; username: string; role: Role };

export type RoomType = {
  code: string;
  name: string;
  state: RoomState;
  creator: RoomUserType;
  gameDefinition: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RoomWithUsersType = RoomType & {
  users: RoomUserType[];
};

export type RoomsType = Array<RoomType & { userCount: number }>;

// Prisma selector types
type PrismaRoomUserType = { id: boolean; username: boolean; role: boolean };

export type PrismaRoomType = Prisma.RoomGetPayload<{
  include: {
    creator: { select: PrismaRoomUserType };
    game: { select: { definitionSlug: boolean } };
    users: { select: { user: { select: PrismaRoomUserType } } };
    _count: { select: { users: boolean } };
  };
}>;
