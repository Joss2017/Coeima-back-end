import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from 'src/auth/get-user.decorator';
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

  async findAll(): Promise<Topic[]> {
    const topicFound = await this.topicRepository.find();
    if (!topicFound) {
      throw new NotFoundException(`Topics non trouvée`);
    }
    return topicFound;
  }
  // -----------------------------------------------Méthode afficher un TOPIC-------------------------------//

  async findOne(idValue: string): Promise<Topic> {
    try {
      const topicsFound = await this.topicRepository.findOneBy({
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
    const { title, body, url } = createTopicDto;
    const newTopic = await this.topicRepository.create({
      title,
      body,
      url,
      userId: user,
    });

    try {
      return await this.topicRepository.save(newTopic);
    } catch (error) {
      throw new Error(`${error}, les données ne sont pas crées`);
    }
  }

  // -----------------------------------------------Méthode update TOPICS-------------------------------//

  async update(idValue: string, updateTopicDto: UpdateTopicDto, user: User) {
    //-------------------------Recherche topics dans la BDD -------------------//

    const updateTopicsFound = await this.topicRepository.findOneBy({
      id: idValue,
      userId: user,
    });
    console.log('id requête update topics', idValue);
    console.log('id utilisateur upadate topics', user.id);

    //-------------------------Gestion erreur si pas de topic dans la BDD -------//

    if (!updateTopicsFound) {
      throw new NotFoundException("Ce sujet n'existe pas");
    }

    //-------------------------Gestion erreur si même valeur-----------//

    if (updateTopicsFound.title === updateTopicDto.title) {
      throw new Error('Erreur, le titre est le même que preceddment');
    }
    if (updateTopicsFound.body === updateTopicDto.body) {
      throw new Error('Erreur, le commentaire est le même que precedemment');
    }
    //-----Destructuration de l'update afin de vérifier si données dejà existantes ----//
    const { title, body } = updateTopicDto;
    console.log('le titre du nouveau topic', title);
    console.log('le titre du nouveau commentaire', body);

    if (title) {
      updateTopicsFound.title = title;
    }
    if (body) {
      updateTopicsFound.body = body;
    }
    try {
      return await this.topicRepository.save(updateTopicsFound);
    } catch (error) {
      throw new Error(`${error}, les données ne sont pas enregistrés`);
    }
  }

  // -----------------------------------------------Méthode delete TOPICS by Admin---------------------//

  async remove(id: string, user: User): Promise<Topic | string> {
    const result = await this.topicRepository.delete({
      id,
      userId: user,
    });
    console.log('résultat du delete par id', result);
    if (result.affected === 0) {
      throw new NotFoundException(`pas d'utilisateur trouvé avec l'id:${id}`);
    }
    return `Cette action a supprimé le topic de l'utilisateur ${user.nickname}`;
  }
}
