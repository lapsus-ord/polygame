-- DropForeignKey
ALTER TABLE "users_in_rooms" DROP CONSTRAINT "users_in_rooms_room_id_fkey";

-- AddForeignKey
ALTER TABLE "users_in_rooms" ADD CONSTRAINT "users_in_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
