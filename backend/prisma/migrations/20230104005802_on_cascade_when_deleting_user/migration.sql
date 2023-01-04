-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "users_in_rooms" DROP CONSTRAINT "users_in_rooms_user_id_fkey";

-- AddForeignKey
ALTER TABLE "users_in_rooms" ADD CONSTRAINT "users_in_rooms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
