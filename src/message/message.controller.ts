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
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/decorator/get-user.decorator';
import { Message } from './entities/message.entity';

@Controller('message')
@UseGuards(AuthGuard())
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //-------------------------Route afficher tout les MESSAGES-----------------------------//

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() connectedUser: User): Promise<Message[]> {
    return this.messageService.findAll(connectedUser);
  }

  //-------------------------Route créer un MESSAGE userConnecté--------------------------------------//
  @Post(':id')
  createMessage(
    @Param('id') idValue: string,
    @Body() createMessageDto: CreateMessageDto,
    @GetUser() connectedUser: User,
  ): Promise<Message> {
    return this.messageService.createMessage(
      createMessageDto,
      connectedUser,
      idValue,
    );
  }

  @Patch(':id')
  updateMessage(
    @Param('id') idValue: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @GetUser() connectedUser: User,
  ) {
    return this.messageService.updateMessage(
      idValue,
      updateMessageDto,
      connectedUser,
    );
  }
  //-------------------------Route delete un MESSAGE--------------------------------------//
  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') idValue: string, @GetUser() connectedUser: User) {
    return this.messageService.remove(idValue, connectedUser);
  }
}
