import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //-------------------------Route afficher tout les MESSAGES-----------------------------//

  @Get()
  findAll() {
    return this.messageService.findAll();
  }
  //-------------------------Route afficher un MESSAGE-----------------------------------//

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  //-------------------------Route créer un MESSAGE all--------------------------------------//

  @Post()
  createAll(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }
  //-------------------------Route créer un MESSAGE userConnecté--------------------------------------//
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }
  //-------------------------Route delete un MESSAGE--------------------------------------//
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
