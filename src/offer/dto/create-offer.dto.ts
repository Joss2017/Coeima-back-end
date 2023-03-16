//--- POST Data Transfert Object modèle de conception utilisé pour transférer des données entre les couches---//

export class CreateOfferDto {
  picture: string;
  title: string;
  body: string;
  price: number;
}
