import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

//------------------------------------------------ par le decorator @Injectable => definit le Provider TopicModule------------//
@Injectable()
//---------------------------------------------------------- export de la classe OfferService---------------------------------//
export class OfferService {
  //-------------------------Constructor avec mise en place paramètre privé+decorator @InjectRepository entité Offer----------//
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  // -----------------------------------------------Méthode afficher tout les OFFERS-----------------//

  async findAllOffers() {
    const allOffersFound = await this.offerRepository.find();
    if (!allOffersFound) {
      throw new NotFoundException(`offres non trouvée`);
    }
    return allOffersFound;
  }

  // -----------------------------------------------Méthode afficher un OFFER------------------------//

  async findOneOffer(idValue: string) {
    try {
      const oneOfferFound = await this.offerRepository.findOneBy({
        id: idValue,
      });
      console.log(' offer trouvé', oneOfferFound);
      return oneOfferFound;
    } catch (error) {
      `Pas d'offre trouvée`;
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode de création OFFER---------------------------//

  async createOfferByAdmin(
    createOfferDto: CreateOfferDto,
    connectedUser: User,
  ): Promise<Offer> {
    const { title, body, picture, price } = createOfferDto;
    const newOffer = await this.offerRepository.create({
      title,
      body,
      picture,
      price,
      createdBy: connectedUser,
    });
    console.log('création newOffer-------- ', newOffer);

    try {
      return await this.offerRepository.save(newOffer);
    } catch (error) {
      ` les données ne sont pas crées`;
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode update un OFFER---------------------------//

  async updateOfferByAdmin(
    idValue: string,
    updateOfferDto: UpdateOfferDto,
    connectedUser: User,
  ) {
    //-------------------------Recherche topics dans la BDD -------------------//

    const offerFound = await this.offerRepository.findOneBy({
      id: idValue,
    });
    console.log(' user requête update offer', connectedUser);
    console.log(' offerFound trouvé', offerFound);

    //-------------------------Gestion erreur si pas de topic dans la BDD -------//

    if (!offerFound) {
      throw new NotFoundException("Cette offre n'existe pas");
    }

    //-----Destructuration de l'update afin de vérifier si données dejà existantes ----//
    const { title, body, picture, price } = updateOfferDto;
    console.log('le titre de la nouvelle offre', title);
    console.log('le body la nouvelle offre', body);

    if (picture) {
      offerFound.picture = picture;
    }
    if (title) {
      offerFound.title = title;
    }
    if (body) {
      offerFound.body = body;
    }
    if (price) {
      offerFound.price = price;
    }
    try {
      return await this.offerRepository.save(offerFound);
    } catch (error) {
      ` les données ne sont pas mises à jour`;
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode delete un OFFER---------------------------//

  async removeOfferByAdmin(idValue: string) {
    const oneOfferFound = await this.offerRepository.findOneBy({
      id: idValue,
    });
    console.log('topic trouvé', oneOfferFound);

    //-------------------------Gestion erreur si pas de offer dans la BDD -------//

    if (!oneOfferFound) {
      throw new NotFoundException("Ce topic n'existe pas");
    }
    try {
      const result = await this.offerRepository.delete({
        id: idValue,
      });
      console.log('valeur du result par id', result);
      if (result.affected !== 0) {
        return `Cette action a supprimé ton offre de service dont le titre était ${oneOfferFound.title}`;
      }
    } catch (error) {
      `Impossible de supprimer ton offre de service `;
      console.log(error);
    }
  }
}
