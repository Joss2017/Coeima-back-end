//--- POST Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//
import { IsNotEmpty } from 'class-validator';

export class CreateAdminMessageDto {
  @IsNotEmpty({ message: 'Le message ne peut pas être vide' })
  body: string;
}
