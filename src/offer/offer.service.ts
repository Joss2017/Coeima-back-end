import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OfferService {
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

  async findOne(idValue: string) {
    try {
      const oneOfferFound = await this.offerRepository.findOneBy({
        id: idValue,
      });
      console.log('id du offer trouvé', oneOfferFound);
      return oneOfferFound;
    } catch (error) {
      throw new NotFoundException(`pas de sujet trouvé avec l'id:${idValue}`);
    }
  }

  // -----------------------------------------------Méthode créer un OFFER---------------------------//

  async create(createOfferDto: CreateOfferDto, connectedUser: User) {
    const { title, body, picture } = createOfferDto;
    const newOffer = await this.offerRepository.create({
      title,
      body,
      picture,
      user: connectedUser,
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

  async update(
    idValue: string,
    updateOfferDto: UpdateOfferDto,
    connectedUser: User,
  ) {
    //-------------------------Recherche topics dans la BDD -------------------//

    const offerFound = await this.offerRepository.findOneBy({
      id: idValue,
      user: connectedUser,
    });
    console.log(' user requête update offer', connectedUser);
    console.log(' offerFound trouvé', offerFound);

    //-------------------------Gestion erreur si pas de topic dans la BDD -------//

    if (!offerFound) {
      throw new NotFoundException("Ce sujet n'existe pas");
    }

    //-------------------------Gestion erreur si même valeur-----------//

    if (offerFound.title === updateOfferDto.title) {
      throw new Error('Erreur, le titre est le même que precedemment');
    }

    //-----Destructuration de l'update afin de vérifier si données dejà existantes ----//
    const { title, body } = updateOfferDto;
    console.log('le titre du nouveau topic', title);
    console.log('le titre du nouveau commentaire', body);

    if (title) {
      offerFound.title = title;
    }
    if (body) {
      offerFound.body = body;
    }
    try {
      return await this.offerRepository.save(offerFound);
    } catch (error) {
      ` les données ne sont pas mises à jour`;
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode delete un OFFER---------------------------//

  async remove(idValue: string) {
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
