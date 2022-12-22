import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [RoomsModule],
  exports: [UsersService],
})
export class UsersModule {}
