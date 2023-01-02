-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_definition_slug_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_game_id_fkey";

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_definition_slug_fkey" FOREIGN KEY ("definition_slug") REFERENCES "game_definitions"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
