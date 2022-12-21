/*
  Warnings:

  - You are about to drop the column `game_type` on the `game_definitions` table. All the data in the column will be lost.
  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams_in_rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_in_teams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "teams_in_rooms" DROP CONSTRAINT "teams_in_rooms_room_id_fkey";

-- DropForeignKey
ALTER TABLE "teams_in_rooms" DROP CONSTRAINT "teams_in_rooms_team_id_fkey";

-- DropForeignKey
ALTER TABLE "users_in_teams" DROP CONSTRAINT "users_in_teams_team_id_fkey";

-- DropForeignKey
ALTER TABLE "users_in_teams" DROP CONSTRAINT "users_in_teams_user_id_fkey";

-- AlterTable
ALTER TABLE "game_definitions" DROP COLUMN "game_type",
ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#000';

-- DropTable
DROP TABLE "teams";

-- DropTable
DROP TABLE "teams_in_rooms";

-- DropTable
DROP TABLE "users_in_teams";

-- DropEnum
DROP TYPE "GameType";
