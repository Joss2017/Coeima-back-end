//--- POST Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';
import { RoleEnumType } from 'src/user/entities/user.entity';

export class CreateMessageDto {
  //--- Import de la class validator permettant de mettre des conditions données entrantes---//

  role: string;
  @IsNotEmpty({ message: 'ton message ne peut pas être vide' })
  body: string;

  @ValidateIf((user) => user.role === RoleEnumType.ADMIN)
  @IsUUID(4)
  receiver_id?: string;
}
