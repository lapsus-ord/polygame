import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { errors } from '../../error.message';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: errors.register.usernameEmpty })
  @MinLength(3, { message: errors.register.usernameMinLength })
  @MaxLength(13, { message: errors.register.usernameMaxLength })
  @ValidateIf((object, value) => value !== undefined)
  username?: string;

  @ValidateIf((object, value) => value !== undefined)
  role?: Role;
}
