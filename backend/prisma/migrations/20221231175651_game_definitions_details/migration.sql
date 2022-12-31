/*
  Warnings:

  - You are about to drop the column `color` on the `game_definitions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "game_definitions" DROP COLUMN "color",
ADD COLUMN     "bg_color" TEXT NOT NULL DEFAULT '#000',
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "logo" TEXT NOT NULL DEFAULT '🕹️',
ADD COLUMN     "text_color" TEXT NOT NULL DEFAULT '#fff';
