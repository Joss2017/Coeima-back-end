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
    const topicFound = await this.topicRepository.find();
    if (!topicFound) {
      throw new NotFoundException(`Topics non trouvée`);
    }
    return topicFound;
  }
  // -----------------------------------------------Méthode afficher un TOPIC-------------------------------//

  async findOne(idValue: string) {
    try {
      const topicFound = await this.topicRepository.findOneBy({
        id: idValue,
      });
      console.log('id du topic----------------', idValue);
      return topicFound;
    } catch (error) {
      if (error) {
        throw new NotFoundException(`pas de sujet trouvé avec l'id:${idValue}`);
      }
    }
  }
  // -----------------------------------------------Méthode de création TOPICS-------------------------------//

  async create(createTopicDto: CreateTopicDto, user: User) {
    const { title, body, url } = createTopicDto;
    const newTopic = await this.topicRepository.create({
      title,
      body,
      url,
      user,
    });
    console.log('création newTopic-------- ', newTopic);
    try {
      return await this.topicRepository.save(newTopic);
    } catch (error) {
      throw new Error(`${error}, les données ne sont pas crées`);
    }
  }

  // -----------------------------------------------Méthode update TOPICS-------------------------------//

  async update(idValue: string, updateTopicDto: UpdateTopicDto, user: User) {
    //-------------------------Recherche topics dans la BDD -------------------//

    const topicFound = await this.topicRepository.findOneBy({
      id: idValue,
      user,
    });
    console.log('id requête update topics', idValue);
    console.log('id utilisateur upadate topics', user.id);

    //-------------------------Gestion erreur si pas de topic dans la BDD -------//

    if (!topicFound) {
      throw new NotFoundException("Ce sujet n'existe pas");
    }

    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (topicFound.id !== user.id && user.role !== 'admin') {
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
      throw new Error(`${error}, les données ne sont pas enregistrés`);
    }
  }

  // -----------------------------------------------Méthode delete TOPICS by Admin---------------------//

  async remove(id: string, user: User) {
    const topicFound = await this.topicRepository.findOneBy({
      id,
    });
    console.log('id requête user pour topic', id);
    console.log('topic trouvé', topicFound);

    //-------------------------Gestion erreur si pas de topic dans la BDD -------//

    if (!topicFound) {
      throw new NotFoundException("Ce topic n'existe pas");
    }
    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (topicFound.id !== user.id && user.role !== 'admin') {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    try {
      const result = await this.topicRepository.delete({
        id,
      });
      console.log('valeur du result par id', result);
      if (result.affected !== 0) {
        return `Cette action a supprimé dont le titre était ${topicFound.title}`;
      }
    } catch (error) {
      throw new error(`Impossible de supprimer le user ${error}`);
    }
  }
}
