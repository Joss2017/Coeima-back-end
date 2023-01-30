import { RoleEnumType } from '../entities/user.entity';

//--- POST Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class CreateUserDto {
  role: RoleEnumType;
  nickname: string;
  email: string;
  password: string;
  telephone: string;
  files: string;
  legendFiles: string;
}
