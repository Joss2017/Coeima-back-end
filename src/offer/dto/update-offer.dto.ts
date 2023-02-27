import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferDto } from './create-offer.dto';

//--- UPDATE Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  file: string;
  title: string;
  body: string;
  price: string;
}
