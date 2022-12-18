import { Module } from '@nestjs/common';
import { GamesModule } from 'src/games/games.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  providers: [RoomsService],
  controllers: [RoomsController],
  imports: [GamesModule],
  exports: [RoomsService],
})
export class RoomsModule {}
