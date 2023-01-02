import {
  IsHexColor,
  IsLowercase,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { errors } from '../../error.message';

export class CreateDefinitionDto {
  @IsString()
  @IsNotEmpty({ message: errors.gameDefinitions.slugNotEmpty })
  @IsLowercase()
  slug: string;

  @IsString()
  @IsNotEmpty({ message: errors.gameDefinitions.nameNotEmpty })
  name: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  logo?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  description?: string;

  @IsHexColor({ message: errors.gameDefinitions.colorIsNotHex })
  @ValidateIf((object, value) => value !== undefined)
  color?: string;
}

export class UpdateDefinitionDto {
  @IsString()
  @IsNotEmpty({ message: errors.gameDefinitions.slugNotEmpty })
  @IsLowercase()
  @ValidateIf((object, value) => value !== undefined)
  slug?: string;

  @IsString()
  @IsNotEmpty({ message: errors.gameDefinitions.nameNotEmpty })
  @ValidateIf((object, value) => value !== undefined)
  name?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  logo?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  description?: string;

  @IsHexColor({ message: errors.gameDefinitions.colorIsNotHex })
  @ValidateIf((object, value) => value !== undefined)
  color?: string;
}
