import { RoleEnumType } from 'src/users/entities/user.entity';

// -----------------------------------Création du compte USER------------------------------//

export class CreateAuthDto {
  role: RoleEnumType;
  nickname: string;
  email: string;
  password: string;
  telephone: string;
  files: string;
  legendFiles: string;
}
