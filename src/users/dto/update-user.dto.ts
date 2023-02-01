import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto ';
import { RoleEnumType } from '../entities/user.entity';

//--- UPDATE Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class UpdateUserDto extends PartialType(CreateAuthDto) {
  role: RoleEnumType;

  //--- Import de la class validator permettant de mettre des conditions données entrantes---//

  @IsString()
  @IsNotEmpty()
  @MinLength(4, {
    message: 'la taille du pseudo doit être au minimum de 4 caractères',
  })
  @MaxLength(50, {
    message: 'la taille du pseudo doit être au maximum de 50 caractères',
  })
  nickname: string;

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

  hashedPassword: string;

  @IsString()
  @IsOptional()
  @MaxLength(10, { message: '10 chiffres maximum' })
  phone: string;
}
