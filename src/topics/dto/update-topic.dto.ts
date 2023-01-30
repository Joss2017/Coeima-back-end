import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicDto } from './create-topic.dto';

//--- UPDATE Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
  title: string;
  body: string;
  favorites: boolean;
  url: string;
  tag: boolean;
  comments: Comment;
}
