import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  // -----------------------------------------------Méthode afficher tout les TOPICS------------------------//

  async findAll() {
    const allTopicsFound: Topic[] = await this.topicRepository.find();
    console.log('topics trouvés', allTopicsFound);
    if (!allTopicsFound) {
      throw new NotFoundException(`Topics non trouvée`);
    }

    return allTopicsFound;
  }
  // -----------------------------------------------Méthode afficher un TOPIC-------------------------------//

  async findOne(idValue: string) {
    try {
      const oneTopicFound = await this.topicRepository.findOneBy({
        id: idValue,
      });
      console.log('id du topic trouvé----------------', idValue);
      return oneTopicFound;
    } catch (error) {
      `pas de sujet trouvé avec l'id:${idValue}`;
      console.log(error);
    }
  }
  // -----------------------------------------------Méthode de création TOPICS-------------------------------//

  async create(createTopicDto: CreateTopicDto, connectedUser: User) {
    const { title, body, url } = createTopicDto;
    const newTopic = await this.topicRepository.create({
      title,
      body,
      url,
      user: connectedUser,
    });
    console.log('création newTopic-------- ', newTopic);
    try {
      return await this.topicRepository.save(newTopic);
    } catch (error) {
      `les données ne sont pas crées`;
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode update TOPICS-------------------------------//

  async update(
    idValue: string,
    updateTopicDto: UpdateTopicDto,
    connectedUser: User,
  ) {
    //-------------------------Recherche topics dans la BDD -------------------//

    const topicFound = await this.topicRepository.findOneBy({
      id: idValue,
      user: connectedUser,
    });
    console.log('connectedUser requete remove user', connectedUser);
    console.log(' topic trouvé', topicFound);

    //-------------------------Gestion erreur si pas de topic dans la BDD -------//

    if (!topicFound) {
      throw new NotFoundException("Ce sujet n'existe pas");
    }

    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (topicFound.id !== connectedUser.id && connectedUser.role !== 'admin') {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }

    //-------------------------Gestion erreur si même valeur-----------//

    if (topicFound.title === updateTopicDto.title) {
      throw new Error('Erreur, le titre est le même que precedemment');
    }
    if (topicFound.body === updateTopicDto.body) {
      throw new Error('Erreur, le commentaire est le même que precedemment');
    }
    //-----Destructuration de l'update afin de vérifier si données dejà existantes ----//
    const { title, body } = updateTopicDto;
    console.log('le titre du nouveau topic', title);
    console.log('le titre du nouveau commentaire', body);

    if (title) {
      topicFound.title = title;
    }
    if (body) {
      topicFound.body = body;
    }
    try {
      return await this.topicRepository.save(topicFound);
    } catch (error) {
      ` les données ne sont pas enregistrés`;
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode delete TOPICS by Admin---------------------//

  async remove(idValue: string, connectedUser: User) {
    const oneTopicFound = await this.topicRepository.findOneBy({
      id: idValue,
    });
    console.log('connectedUser remove topic', connectedUser);
    console.log('topic trouvé', oneTopicFound);

    //-------------------------Gestion erreur si pas de topic dans la BDD -------//

    if (!oneTopicFound) {
      throw new NotFoundException("Ce topic n'existe pas");
    }
    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (
      oneTopicFound.id !== connectedUser.id &&
      connectedUser.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    try {
      const result = await this.topicRepository.delete({
        id: idValue,
      });
      console.log('valeur du result par id', result);
      if (result.affected !== 0) {
        return `Cette action a supprimé le post du forum dont le titre était ${oneTopicFound.title}`;
      }
    } catch (error) {
      `Impossible de supprimer le user`;
      console.log(error);
    }
  }
}
