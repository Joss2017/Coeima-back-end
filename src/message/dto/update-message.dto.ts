import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

//--- UPDATE Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  //--- Import de la class validator permettant de mettre des conditions données entrantes---//

  @IsNotEmpty({ message: 'Le texte de ton post ne peut pas être vide' })
  body: string;

  @IsOptional()
  @IsUrl({ message: "ton lien URL n'est pas valide" })
  url: string;

  isRead: boolean;
}
