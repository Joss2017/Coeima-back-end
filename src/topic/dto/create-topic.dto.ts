import { IsNotEmpty, IsString } from 'class-validator';
//--- POST Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class CreateTopicDto {
  //--- Import de la class validator permettant de mettre des conditions données entrantes---//

  @IsString()
  @IsNotEmpty({ message: 'Le titre de votre post doit être complété' })
  title: string;

  body: string;

  url: string;
}
