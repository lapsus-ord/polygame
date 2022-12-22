-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "RoomState" AS ENUM ('WAITING', 'IN_PROGRESS', 'FINISHED');

-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('INDIVIDUAL', 'TEAM');

-- CreateTable
CREATE TABLE "users"
(
    "id"            SERIAL       NOT NULL,
    "created_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"    TIMESTAMP(3) NOT NULL,
    "username"      TEXT         NOT NULL,
    "password"      TEXT         NOT NULL,
    "refresh_token" TEXT,
    "role"          "Role"       NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_in_teams"
(
    "user_id"  INTEGER      NOT NULL,
    "team_id"  INTEGER      NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_in_teams_pkey" PRIMARY KEY ("user_id", "team_id")
);

-- CreateTable
CREATE TABLE "teams"
(
    "id"         SERIAL       NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "code"       TEXT         NOT NULL,
    "name"       TEXT         NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_in_rooms"
(
    "user_id"   INTEGER      NOT NULL,
    "room_id"   INTEGER      NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_in_rooms_pkey" PRIMARY KEY ("user_id", "room_id")
);

-- CreateTable
CREATE TABLE "teams_in_rooms"
(
    "team_id"  INTEGER      NOT NULL,
    "room_id"  INTEGER      NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teams_in_rooms_pkey" PRIMARY KEY ("team_id", "room_id")
);

-- CreateTable
CREATE TABLE "rooms"
(
    "id"         SERIAL       NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "code"       TEXT         NOT NULL,
    "name"       TEXT         NOT NULL,
    "is_public"  BOOLEAN      NOT NULL,
    "state"      "RoomState"  NOT NULL,
    "game_id"    INTEGER      NOT NULL,
    "creator_id" INTEGER      NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games"
(
    "id"              SERIAL       NOT NULL,
    "created_at"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"      TIMESTAMP(3) NOT NULL,
    "definition_slug" TEXT         NOT NULL,
    "config"          JSONB        NOT NULL,
    "data"            JSONB        NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_definitions"
(
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "slug"       TEXT         NOT NULL,
    "name"       TEXT         NOT NULL,
    "enabled"    BOOLEAN      NOT NULL DEFAULT false,
    "game_type"  "GameType"   NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users" ("username");

-- CreateIndex
CREATE UNIQUE INDEX "teams_code_key" ON "teams" ("code");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_code_key" ON "rooms" ("code");

-- CreateIndex
CREATE UNIQUE INDEX "game_definitions_slug_key" ON "game_definitions" ("slug");

-- AddForeignKey
ALTER TABLE "users_in_teams"
    ADD CONSTRAINT "users_in_teams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_in_teams"
    ADD CONSTRAINT "users_in_teams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_in_rooms"
    ADD CONSTRAINT "users_in_rooms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_in_rooms"
    ADD CONSTRAINT "users_in_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams_in_rooms"
    ADD CONSTRAINT "teams_in_rooms_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams_in_rooms"
    ADD CONSTRAINT "teams_in_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms"
    ADD CONSTRAINT "rooms_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms"
    ADD CONSTRAINT "rooms_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games"
    ADD CONSTRAINT "games_definition_slug_fkey" FOREIGN KEY ("definition_slug") REFERENCES "game_definitions" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE;


---- CUSTOM SQL ----
-- Triggers can be found in prisma/triggers.sql

-- Delete generated game when room is deleted
create or replace function public.delete_game()
    returns trigger
as
$$
begin
    delete from public.games g where g.id = OLD.game_id;
    return OLD;
end;
$$ language plpgsql;

create or replace trigger delete_game_when_room_deleted_trigger
    after delete
    on public.rooms
    for each row
execute procedure public.delete_game();

-- Delete room when nobody is in it
create or replace function public.delete_room()
    returns trigger
as
$$
begin
    delete
    from public.rooms r
    where r.id = old.room_id
      and 0 = (select count(1)
               from public.users_in_rooms u_r
               where u_r.room_id = old.room_id);
end;
$$ language plpgsql;

create or replace trigger delete_room_when_nobody_is_in_it_trigger
    after delete
    on public.users_in_rooms
    for each row
execute procedure public.delete_room();
