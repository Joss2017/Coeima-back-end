// -----------------------------------Connexion du compte USER------------------------------//

import { RoleEnumType } from 'src/users/entities/user.entity';

export class LoginAuthDto {
  role: RoleEnumType;
  nickname: string;
  email: string;
  password: string;
}
