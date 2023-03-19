import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnumType, User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/createForUserMessage.dto';
import { CreateAdminMessageDto } from './dto/createForAdminmessage.dto ';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  // -----------------------------------------------Méthode afficher tout les MESSAGES-----------------//

  async findAll(connectedUser: User) {
    try {
      let allMessagesFound: Message[] = [];

      if (connectedUser.role === 'admin') {
        allMessagesFound = await this.messageRepository.findBy({
          receiver: { role: RoleEnumType.ADMIN },
        });
        console.log("Tous les messages par l'admin", allMessagesFound);
      } else {
        allMessagesFound = await this.messageRepository.findBy({
          receiver: { id: connectedUser.id },
        });
        console.log('Messages par utilisateur', allMessagesFound);
        console.log('valeur de  connectUser.id ', connectedUser.id);
      }

      return allMessagesFound;
    } catch (error) {
      ` L'affichage de tout les messages est compromis  `;
      console.log('tout les messages par user', error);
    }
  }

  // -----------------------------------------------Méthode créer un MESSAGE USER connecté---------------------------//

  async createMessage(
    createMessageDto: CreateMessageDto,
    connectedUser: User,
  ): Promise<Message> {
    //---------------------------------------- DTO destructuré---------------------------//
    const { body, receiver_id } = createMessageDto;

    //-------------------------------- Création du message avec les données correspondantes---------------------//
    const receiver = await this.userRepository.findOneBy({
      id: receiver_id,
    });
    console.log('receiver id : ', receiver);
    const newMessage = this.messageRepository.create({
      sender: connectedUser,
      receiver: receiver,
      body,
    });

    try {
      //------------------------- Enregistrement du message dans la base de données-----------------------------------------//
      const savedMessage = await this.messageRepository.save(newMessage);
      console.log('Le message a été enregistré avec succès : ', savedMessage);
      return savedMessage;
    } catch (error) {
      console.log(error);
    }
  }

  async createAdminMessage(
    createAdminMessageDto: CreateAdminMessageDto,
    connectedUser: User,
  ): Promise<Message> {
    const { body } = createAdminMessageDto;
    const receiverAdmin = await this.userRepository.findOneBy({
      role: RoleEnumType.ADMIN,
    });

    const newMessage = this.messageRepository.create({
      sender: connectedUser,
      receiver: receiverAdmin,
      body,
    });

    try {
      const savedMessage = await this.messageRepository.save(newMessage);
      console.log('Le message a été enregistré avec succès : ', savedMessage);
      return savedMessage;
    } catch (error) {
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode update un MESSAGE---------------------------------------------//

  async updateMessage(
    idValue: string,
    updateMessageDto: UpdateMessageDto,
    connectedUser: User,
  ) {
    //-------------------------Recherche du message dans la BDD ----------------------------------------------------------//

    const oneMessageFound = await this.messageRepository.findOneBy({
      id: idValue,
    });
    console.log('connectedUser requete update message', connectedUser);
    console.log('message trouvé', oneMessageFound);

    //-------------------------Gestion erreur si pas de message dans la BDD -------//

    if (!oneMessageFound) {
      throw new NotFoundException("Ce message n'existe pas");
    }

    //-------------------------Gestion erreur si  user pas autorisé -----------//
    if (
      oneMessageFound.receiver.id !== connectedUser.id &&
      connectedUser.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }

    //-----------------------------Destructuration de l'update Message------------------------//

    const { isRead } = updateMessageDto;
    //-----Comparaison des données entrantes avec Bdd si différentes, nouvelle valeur---------//

    if (isRead === true) {
      oneMessageFound.isRead = isRead;
    } else {
      throw new InternalServerErrorException(
        `Votre message est toujours en attente`,
      );
    }

    try {
      //-----Sauveagarde des données entrantes------------------------//

      return await this.messageRepository.save(oneMessageFound);
    } catch (error) {
      ('les mises à jour de votre message ne sont pas prises en compte');
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode delete un MESSAGE---------------------------//

  async remove(idValue: string, connectedUser: User) {
    const oneMessageFound = await this.messageRepository.findOneBy({
      id: idValue,
    });
    console.log('connectedUser remove message', connectedUser);
    console.log('message trouvé  remove', oneMessageFound);

    //-------------------------Gestion erreur si pas de message dans la BDD -------//

    if (!oneMessageFound) {
      throw new NotFoundException("Ce message n'existe pas");
    }
    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (
      oneMessageFound.receiver.id !== connectedUser.id &&
      connectedUser.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    try {
      const result = await this.messageRepository.delete({
        id: idValue,
      });
      console.log('valeur du result par id', result);
      if (result.affected !== 0) {
        return `Cette action a supprimé le message avec le contenu ${oneMessageFound.body}`;
      }
    } catch (error) {
      `Impossible de supprimer le message`;
      console.log(error);
    }
  }
}
