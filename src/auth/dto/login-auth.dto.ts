import { IsEmail, IsNotEmpty } from 'class-validator';
// -----------------------------------Connexion du compte USER------------------------------//

export class LoginAuthDto {
  //--- Import de la class validator permettant de mettre des conditions données entrantes---//

  @IsEmail({
    message: "le format du mail n'est pas conforme",
  })
  @IsNotEmpty({
    message: 'ton mail doit être complété',
  })
  email: string;

  @IsNotEmpty({
    message: 'ton mail doit être complété',
  })
  password: string;
}
