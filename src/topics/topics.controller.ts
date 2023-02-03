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
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  //---------------------------------------------------ROUTES ROLE USER/ADMIN-----------------------------------//

  //-------------------------Route afficher tout les topics-----------------------------//

  @Get()
  findAll() {
    return this.topicsService.findAll();
  }

  //-------------------------Route afficher un Topic-----------------------------//

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.findOne(id);
  }

  //-------------------------Route créer un Topic-----------------------------//

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body()
    createTopicDto: CreateTopicDto,
    @GetUser() user: User,
  ): Promise<Topic> {
    return this.topicsService.create(createTopicDto, user);
  }

  //-------------------------Route update un Topic-----------------------------//

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
    @GetUser() user: User,
  ) {
    return this.topicsService.update(id, updateTopicDto, user);
  }

  //-------------------------Route supprimer un Topic-----------------------------//

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<string | Topic> {
    return this.topicsService.remove(id, user);
  }
}
