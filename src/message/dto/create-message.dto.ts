//--- POST Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMessageDto {
  //--- Import de la class validator permettant de mettre des conditions données entrantes---//

  role: string;

  @IsUUID(4, { message: 'Merci de saisir un utilisateur' })
  receiver_id: string;

  @IsNotEmpty({ message: 'ton message ne peut pas être vide' })
  body: string;
}
