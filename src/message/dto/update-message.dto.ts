import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';

//--- UPDATE Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  body: string;
}
