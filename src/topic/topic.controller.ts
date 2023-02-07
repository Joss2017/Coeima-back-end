import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import { GetUser } from 'src/decorator/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { TopicService } from './topic.service';
import { User } from 'src/user/entities/user.entity';

//------------------------- par le decorator @Controller => definit le Provider TopicModule----------------------------------//
@Controller('topic')
//----------------------------------- export de la classe user controller---------------------------------------------------//
export class TopicController {
  //-------------------------Constructor avec mise en place paramètre privé pour instancier la classe TopicService-----------//
  constructor(private readonly topicService: TopicService) {}

  //-------------------------Route afficher tout les TOPICS-----------------------------//

  @Get()
  //-------------------------Méthode findAllUsers qui par promise renverra un tableau USERS--//
  findAllTopics(): Promise<Topic[]> {
    //-------------------------instance de la classe userService-----------------------------//
    return this.topicService.findAllTopics();
  }

  //-------------------------Route afficher un TOPIC-----------------------------//

  //-------------------------Parametrage string id-------------------------------------------------//
  @Get(':id')
  //-------------------------par le decorator Param=>on paramètre notre requête par l'idValue----//
  findOneTopic(@Param('id') idValue: string): Promise<Topic> {
    //-------------------------instance de la classe TopicService-----------------------------------//
    return this.topicService.findOneTopic(idValue);
  }

  //-------------------------Route créer un TOPIC-----------------------------//

  @Post()
  //------------------------- par le decorator useGuard => AuthGuard permettant de s'authentifier pour la requête POST----//
  @UseGuards(AuthGuard())
  //-------------------------Méthode createTopic qui par promise renverra l'objet Topic--//
  createTopic(
    //-------------------------par le decorator Body=> récupérations des données entrantes---------------------------//
    @Body()
    createTopicDto: CreateTopicDto,
    //-------------------------par le decorator GetUser=> Récupération du user connecté------------//
    @GetUser() connectedUser: User,
  ): Promise<Topic> {
    //-------------------------instance de la classe userService-----------------------------------//
    return this.topicService.createTopic(createTopicDto, connectedUser);
  }

  //-------------------------Route update un TOPIC-----------------------------//

  //-------------------------Parametrage string id-------------------------------------------------//
  @Patch(':id')
  //------------------------- par le decorator useGuard => AuthGuard permettant de s'authentifier pour la requete Patch----//
  @UseGuards(AuthGuard())
  //-------------------------Méthode updateUser qui par promise renverra un objet User-------------------//
  updateTopic(
    //-------------------------par le decorator Param=>on paramètre notre requête par l'idValue----//
    @Param('id') idValue: string,
    //-------------------------par le decorator Body=> récupérations des données entrantes---------------------------//
    @Body() updateTopicDto: UpdateTopicDto,
    //-------------------------par le decorator GetUser=> Récupération du user connecté------------//
    @GetUser() connectedUser: User,
  ): Promise<Topic> {
    //-------------------------instance de la classe userService-----------------------------------//
    return this.topicService.updateTopic(
      idValue,
      updateTopicDto,
      connectedUser,
    );
  }

  //-------------------------Route supprimer un Topic-----------------------------//

  //-------------------------Parametrage string id-------------------------------------------------//
  @Delete(':id')
  //------------------------- par le decorator useGuard => AuthGuard permettant de s'authentifier pour la requete Delete----//
  @UseGuards(AuthGuard())
  //-------------------------Méthode removeTopic qui par promise renverra une string-------------------//
  removeTopic(
    //-------------------------par le decorator Param=>on paramètre notre requête par l'idValue----//
    @Param('id') idValue: string,
    //-------------------------par le decorator GetUser=> Récupération du user connecté------------//
    @GetUser() connectedUser: User,
  ): Promise<string> {
    //-------------------------instance de la classe topicService-----------------------------------//
    return this.topicService.removeTopic(idValue, connectedUser);
  }
}
