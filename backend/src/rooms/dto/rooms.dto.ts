import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsBoolean()
  isPublic: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  gameDefinitionSlug: string;
}
