import { IsDataURI, IsNotEmpty, IsString } from 'class-validator';
//--- POST Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class CreateTopicDto {
  //--- Import de la class validator permettant de mettre des conditions données entrantes---//

  @IsString()
  @IsNotEmpty()
  title: string;

  body: string;

  @IsDataURI()
  url: string;

  tag: boolean;
}
