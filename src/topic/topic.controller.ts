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

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  //---------------------------------------------------ROUTES ROLE USER/ADMIN-----------------------------------//

  //-------------------------Route afficher tout les topics-----------------------------//

  @Get()
  findAll() {
    return this.topicService.findAll();
  }

  //-------------------------Route afficher un Topic-----------------------------//

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicService.findOne(id);
  }

  //-------------------------Route créer un Topic-----------------------------//

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body()
    createTopicDto: CreateTopicDto,
    @GetUser() user: User,
  ): Promise<Topic> {
    return this.topicService.create(createTopicDto, user);
  }

  //-------------------------Route update un Topic-----------------------------//

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
    @GetUser() user: User,
  ) {
    return this.topicService.update(id, updateTopicDto, user);
  }

  //-------------------------Route supprimer un Topic-----------------------------//

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<string | Topic> {
    return this.topicService.remove(id, user);
  }
}
