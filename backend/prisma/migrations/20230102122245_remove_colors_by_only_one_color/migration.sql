/*
  Warnings:

  - You are about to drop the column `bg_color` on the `game_definitions` table. All the data in the column will be lost.
  - You are about to drop the column `text_color` on the `game_definitions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "game_definitions" DROP COLUMN "bg_color",
DROP COLUMN "text_color",
ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#fff';
