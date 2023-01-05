import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { errors } from '../../error.message';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: errors.register.usernameEmpty })
  @MinLength(3, { message: errors.register.usernameMinLength })
  @MaxLength(13, { message: errors.register.usernameMaxLength })
  username: string;

  @IsString()
  @IsNotEmpty({ message: errors.register.passwordEmpty })
  password: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty({ message: errors.register.usernameEmpty })
  username: string;

  @IsString()
  @IsNotEmpty({ message: errors.register.passwordEmpty })
  password: string;
}
