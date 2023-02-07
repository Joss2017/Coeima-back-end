import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RoleEnumType } from 'src/user/entities/user.entity';

// -----------------------------------Création du compte USER------------------------------//

export class CreateAuthDto {
  role: RoleEnumType;

  //--- Import de la class validator permettant de mettre des conditions données entrantes---//

  @IsNotEmpty({
    message: 'ton pseudo doit être complété',
  })
  @MinLength(4, {
    message: 'la taille du pseudo doit être au minimum de 4 caractères',
  })
  @MaxLength(50, {
    message: 'la taille du pseudo doit être au maximum de 50 caractères',
  })
  nickname: string;

  @IsEmail({
    message: "le format du mail n'est pas conforme",
  })
  @IsNotEmpty({
    message: 'ton mail doit être complété',
  })
  email: string;

  @IsNotEmpty({
    message: "n'oublie de mettre un mot de passe",
  })
  @MinLength(8, {
    message: 'la taille du mot de passe doit être au minimum de 8 caractères',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'le mot de passe doit contenir 1 lettre minuscule, 1 lettre majuscule et 1 chiffre ou caractère spécial',
  })
  password: string;

  @IsOptional()
  @MinLength(10, { message: '10 chiffres minimum' })
  @MaxLength(10, { message: '10 chiffres maximum' })
  phone: string;
}
