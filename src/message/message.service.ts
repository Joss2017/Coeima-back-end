import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  // -----------------------------------------------Méthode afficher tout les MESSAGES-----------------//

  findAll() {
    return `This action returns all messages`;
  }

  // -----------------------------------------------Méthode afficher un MESSAGE------------------------//

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  // -----------------------------------------------Méthode créer un MESSAGE---------------------------//

  createAll(createMessageDto: CreateMessageDto) {
    return 'This action adds a new message';
  }
  // -----------------------------------------------Méthode créer un MESSAGE---------------------------//

  create(createMessageDto: CreateMessageDto) {
    return 'This action adds a new message';
  }
  // -----------------------------------------------Méthode update un MESSAGE---------------------------//

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }
  // -----------------------------------------------Méthode delete un MESSAGE---------------------------//

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
