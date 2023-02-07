//--- POST Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateCommentDto {
  //--- Import de la class validator permettant de mettre des conditions données entrantes---//

  @IsNotEmpty({ message: 'Le titre ton commentaire ne peut pas être vide' })
  title: string;

  @IsNotEmpty({ message: 'ton commentaire ne peut pas être vide' })
  body: string;

  @IsOptional()
  @IsUrl({ message: "ton lien URL n'est pas valide" })
  url: string;
}
