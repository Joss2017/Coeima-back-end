import { PartialType } from '@nestjs/mapped-types';
import { RoleEnumType } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

//--- UPDATE Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class UpdateUserDto extends PartialType(CreateUserDto) {
  role: RoleEnumType;
  nickname: string;
  email: string;
  password: string;
  hashedPassword: string;
  telephone: string;
  files: string;
  legendFiles: string;
}
