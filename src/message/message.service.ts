import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  // -----------------------------------------------Méthode afficher tout les MESSAGES-----------------//

  async findAll(connectedUser: User) {
    try {
      let allMessagesFound: Message[] = null;

      if (connectedUser.role === 'admin') {
        allMessagesFound = await this.messageRepository.find();
        console.log("tout les messages par l'admin", allMessagesFound);
      } else {
        allMessagesFound = await this.messageRepository.findBy({
          sender: { id: connectedUser.id },
        });
        console.log('tout les messages par user', allMessagesFound);
      }
      if (!allMessagesFound) {
        throw new NotFoundException(`Messages  non trouvées`);
      }
      return allMessagesFound;
    } catch (error) {
      ` L'affichage de tout les messages est compromis  `;
      console.log('tout les messages par user', error);
    }
  }

  // -----------------------------------------------Méthode créer un MESSAGE USER connecté---------------------------//

  async createMessage(createMessageDto: CreateMessageDto, connectedUser: User) {
    const { body } = createMessageDto;
    const newMessage = this.messageRepository.create({
      sender: connectedUser,
      body: body,
    });
    console.log('création du message-------- ', newMessage);
    try {
      await this.messageRepository.save(newMessage);
      return newMessage;
    } catch (error) {
      `les données ne sont pas crées`;
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode update un MESSAGE---------------------------//

  update(id: string, updateMessageDto: UpdateMessageDto, connectedUser: User) {
    return `This action updates a #${id} message`;
  }
  // -----------------------------------------------Méthode delete un MESSAGE---------------------------//

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
