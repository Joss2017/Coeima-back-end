import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
// -----------------------------------Connexion du compte USER------------------------------//

import { RoleEnumType } from 'src/users/entities/user.entity';

export class LoginAuthDto {
  role: RoleEnumType;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'le mot de passe doit contenir 1 lettre minuscule, 1 lettre majuscule et 1 chiffre ou caractère spécial',
  })
  password: string;
}
