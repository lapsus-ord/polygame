import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { errors } from '../../error.message';

export class CreateRoomDto {
  @IsBoolean()
  isPublic: boolean;

  @IsString()
  @IsNotEmpty({ message: errors.rooms.nameEmpty })
  @MinLength(3, { message: errors.rooms.nameMinLength })
  @MaxLength(20, { message: errors.rooms.nameMaxLength })
  name: string;

  @IsString()
  @IsNotEmpty({ message: errors.gameDefinitions.notFound })
  @MinLength(3, { message: errors.rooms.nameMinLength })
  @MaxLength(20, { message: errors.rooms.nameMaxLength })
  gameDefinitionSlug: string;
}
