import {
  Body,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
  ) {}

  // -----------------------------------------------Méthode afficher tout les TOPICS------------------------//

  async findAll(): Promise<Topic[]> {
    const topicFound = await this.topicsRepository.find();
    if (!topicFound) {
      throw new NotFoundException(`Topics non trouvée`);
    }
    return topicFound;
  }
  // -----------------------------------------------Méthode afficher un TOPIC-------------------------------//

  async findOne(idValue: string): Promise<Topic> {
    try {
      const topicsFound = await this.topicsRepository.findOneBy({
        id: idValue,
      });
      console.log('id du topic----------------', idValue);
      return topicsFound;
    } catch (error) {
      if (error) {
        throw new NotFoundException(`pas de sujet trouvé avec l'id:${idValue}`);
      }
    }
  }
  // -----------------------------------------------Méthode de création TOPICS-------------------------------//

  async create(
    @Body() createTopicDto: CreateTopicDto,
    @GetUser() user: User,
  ): Promise<Topic> {
    const newTopic = await this.topicsRepository.create({
      ...createTopicDto,
      userId: user,
    });
    try {
      const createdTopics = await this.topicsRepository.save(newTopic);
      return createdTopics;
    } catch {
      throw new Error("Autre erreur, merci de contacter l'administrateur");
    }
  }

  // -----------------------------------------------Méthode update TOPICS-------------------------------//

  async update(idValue: string, updateTopicDto: UpdateTopicDto, user: User) {
    //-------------------------Recherche topics dans la BDD -------------------//

    const updateTopicsFound = await this.topicsRepository.findOneBy({
      id: idValue,
    });
    console.log('id requête utilisateur', idValue);
    console.log('id utilisateur', user.id);

    //-------------------------Gestion erreur si pas de topic dans la BDD -------//

    if (!updateTopicsFound) {
      throw new NotFoundException("Ce sujet n'existe pas");
    }

    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (updateTopicsFound.id !== user.id) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }

    //-----Destructuration de l'update afin de vérifier si doublon dans BDD ----//

    const { title, body } = updateTopicDto;

    console.log(updateTopicDto.title);
    try {
      updateTopicsFound.title = title;

      updateTopicsFound.body = body;

      return await this.topicsRepository.save(updateTopicsFound);
    } catch {
      throw new Error("Autre erreur, merci de contacter l'administrateur");
    }
  }

  // -----------------------------------------------Méthode delete TOPICS by Admin---------------------//

  async remove(id: string, user: User): Promise<Topic | string> {
    const queryDelete = await this.topicsRepository.createQueryBuilder();
    queryDelete.where({ id: id }).andWhere({ users: user });
    const userFound = await queryDelete.getOne();
    if (!userFound) {
      throw new NotFoundException(`Pas de topics avec l'id: ${id}`);
    } else {
      await this.topicsRepository.delete({ id });
      return 'topic supprimé';
    }
  }
}
