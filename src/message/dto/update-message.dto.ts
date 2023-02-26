import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

//--- UPDATE Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  //--- Import de la class validator permettant de mettre des conditions données entrantes---//

  isRead: boolean;
}
