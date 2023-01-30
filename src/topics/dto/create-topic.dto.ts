//--- POST Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class CreateTopicDto {
  title: string;
  body: string;
  favorites: boolean;
  url: string;
  tag: boolean;
  comments: Comment;
}
