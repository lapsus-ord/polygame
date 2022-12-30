import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { errors } from '../../error.message';

export class CreateRoomDto {
  @IsBoolean()
  isPublic: boolean;

  @IsString()
  @IsNotEmpty({ message: errors.rooms.nameEmpty })
  name: string;

  @IsString()
  @IsNotEmpty({ message: errors.gameDefinitions.notFound })
  gameDefinitionSlug: string;
}
