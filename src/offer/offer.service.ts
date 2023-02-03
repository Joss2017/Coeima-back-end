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
    const offerFound = await this.offerRepository.find();
    if (!offerFound) {
      throw new NotFoundException(`offres non trouvée`);
    }
    return offerFound;
  }

  // -----------------------------------------------Méthode afficher un OFFER------------------------//

  async findOne(idValue: string) {
    try {
      const offerFound = await this.offerRepository.findOneBy({
        id: idValue,
      });
      console.log('id du offer----------------', idValue);
      return offerFound;
    } catch (error) {
      if (error) {
        throw new NotFoundException(`pas de sujet trouvé avec l'id:${idValue}`);
      }
    }
  }

  // -----------------------------------------------Méthode créer un OFFER---------------------------//

  async create(createOfferDto: CreateOfferDto, user: User) {
    const { title, body, picture } = createOfferDto;
    const newOffer = await this.offerRepository.create({
      title,
      body,
      picture,
      user,
    });
    console.log('création newOffer-------- ', newOffer);
    console.log('création newOffer-------- ', user);

    try {
      return await this.offerRepository.save(newOffer);
    } catch (error) {
      throw new Error(`${error}, les données ne sont pas crées`);
    }
  }

  // -----------------------------------------------Méthode update un OFFER---------------------------//

  async update(idValue: string, updateOfferDto: UpdateOfferDto, user: User) {
    //-------------------------Recherche topics dans la BDD -------------------//

    const offerFound = await this.offerRepository.findOneBy({
      id: idValue,
      user,
    });
    console.log('id requête update offer', idValue);
    console.log('id utilisateur upadate offer', user.id);

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
      throw new Error(`${error}, les données ne sont pas mises à jour`);
    }
  }

  // -----------------------------------------------Méthode delete un OFFER---------------------------//

  async remove(id: string, user: User) {
    const result = await this.offerRepository.delete({
      id,
      user: user,
    });
    console.log('valeur affected de result offer remove', result.affected);
    if (result.affected === 0) {
      throw new NotFoundException(`pas d'utilisateur trouvé avec l'id:${id}`);
    }
    return `Cette action a supprimé le topic de l'utilisateur ${user.nickname}`;
  }
}
