//--- POST Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

import { IsNotEmpty } from 'class-validator';
import { RoleEnumType } from 'src/user/entities/user.entity';

export class CreateMessageDto {
  //--- Import de la class validator permettant de mettre des conditions données entrantes---//
  role: string;
  receiver_id: string;

  @IsNotEmpty({ message: 'ton message ne peut pas être vide' })
  body: string;

  files: string;
  legendFiles: string;
}
