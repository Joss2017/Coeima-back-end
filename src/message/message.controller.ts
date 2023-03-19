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
import { RoleEnumType, User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/decorator/get-user.decorator';
import { Message } from './entities/message.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { CreateAdminMessageDto } from './dto/create-message.dto copy';

@Controller('message')
@UseGuards(AuthGuard())
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //-------------------------Route afficher tout les MESSAGES-----------------------------//

  @Get()
  findAll(@GetUser() connectedUser: User): Promise<Message[]> {
    return this.messageService.findAll(connectedUser);
  }

  //-------------------------Route créer un MESSAGE userConnecté--------------------------------------//
  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @GetUser() connectedUser: User,
  ): Promise<Message> {
    return this.messageService.createMessage(createMessageDto, connectedUser);
  }

  @Post('/admin')
  async createAdminMessage(
    @Body() createMessageDto: CreateAdminMessageDto,
    @GetUser() connectedUser: User,
  ): Promise<Message> {
    return this.messageService.createAdminMessage(
      createMessageDto,
      connectedUser,
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
