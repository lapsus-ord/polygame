import { Module } from '@nestjs/common';
import { GamesModule } from 'src/games/games.module';
import { RoomsController } from './rooms.controller';

@Module({
  controllers: [RoomsController],
  imports: [GamesModule],
})
export class RoomsModule {}
