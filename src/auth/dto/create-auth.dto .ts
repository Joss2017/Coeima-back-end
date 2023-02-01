import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RoleEnumType } from 'src/users/entities/user.entity';

// -----------------------------------Création du compte USER------------------------------//

export class CreateAuthDto {
  role: RoleEnumType;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'le mot de passe doit contenir 1 lettre minuscule, 1 lettre majuscule et 1 chiffre ou caractère spécial',
  })
  password: string;

  @IsString()
  @IsOptional()
  @MaxLength(10, { message: '10 chiffres maximum' })
  phone: string;
}
