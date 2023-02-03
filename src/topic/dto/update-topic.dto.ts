import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTopicDto } from './create-topic.dto';

//--- UPDATE Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
  @IsString()
  @IsNotEmpty({ message: 'Le titre de votre post doit être complété' })
  title: string;

  body: string;
  url: string;
}
