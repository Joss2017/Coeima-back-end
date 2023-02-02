import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
// -----------------------------------Connexion du compte USER------------------------------//

export class LoginAuthDto {
  //--- Import de la class validator permettant de mettre des conditions données entrantes---//

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'la taille du mot de passe doit être au minimum de 8 caractères',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'le mot de passe doit contenir 1 lettre minuscule, 1 lettre majuscule et 1 chiffre ou caractère spécial',
  })
  password: string;
}
