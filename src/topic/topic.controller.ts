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
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { TopicService } from './topic.service';
import { User } from 'src/user/entities/user.entity';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  //-------------------------Route afficher tout les TOPICS-----------------------------//

  @Get()
  findAll(): Promise<Topic[]> {
    return this.topicService.findAll();
  }

  //-------------------------Route afficher un TOPIC-----------------------------//

  @Get(':id')
  findOne(@Param('id') idValue: string): Promise<Topic> {
    return this.topicService.findOne(idValue);
  }

  //-------------------------Route créer un TOPIC-----------------------------//

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body()
    createTopicDto: CreateTopicDto,
    @GetUser() connectedUser: User,
  ): Promise<Topic> {
    return this.topicService.create(createTopicDto, connectedUser);
  }

  //-------------------------Route update un TOPIC-----------------------------//

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') idValue: string,
    @Body() updateTopicDto: UpdateTopicDto,
    @GetUser() connectedUser: User,
  ): Promise<Topic> {
    return this.topicService.update(idValue, updateTopicDto, connectedUser);
  }

  //-------------------------Route supprimer un Topic-----------------------------//

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(
    @Param('id') idValue: string,
    @GetUser() connectedUser: User,
  ): Promise<string | Topic> {
    return this.topicService.remove(idValue, connectedUser);
  }
}
