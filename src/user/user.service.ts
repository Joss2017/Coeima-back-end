import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //-------------------------------------------------Trouver tout les Users--------------------------------//

  async findAllUsersByAdmin() {
    return await this.userRepository.find();
  }

  //-------------------------------------------------Mettre à jour un user--------------------------------//

  async updateUser(updateUserDto: UpdateUserDto, connectedUser: User) {
    //-------------------------Recherche du user dans la BDD -------------------//

    const oneUserFound = await this.userRepository.findOneBy({
      id: connectedUser.id,
    });
    console.log('connectedUser requete update user', connectedUser);
    console.log('user trouvé', oneUserFound);

    //-------------------------Gestion erreur si pas de user dans la BDD -------//

    if (!oneUserFound) {
      throw new NotFoundException("Cette utilisateur n'existe pas");
    }

    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (
      oneUserFound.id !== connectedUser.id &&
      connectedUser.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }

    //-----Destructuration de l'update  transfert object------------------------//

    const { nickname, email, password, phone } = updateUserDto;
    try {
      //-----Si password rehashage du nouveau password------------------------//

      if (password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        oneUserFound.password = hashedPassword;
      }
      //-----Comparaisons des données entrantes avec Bdd si différentes, nouvelles valeurs---------//

      if (nickname !== oneUserFound.nickname) {
        oneUserFound.nickname = nickname;
      }
      if (email !== oneUserFound.email) {
        oneUserFound.email = email;
      }
      if (phone !== oneUserFound.phone) {
        oneUserFound.phone = phone;
      }
      //-----Sauveagarde des données entrantes------------------------//

      return await this.userRepository.save(oneUserFound);
    } catch (error) {
      ('les mises à jour ne sont pas prises en compte');
      console.log(error);
    }
  }

  //-------------------------------------------------Supprimer un user- -----------------------------------//

  async remove(idValue: string, connectedUser: User) {
    const oneUserFound = await this.userRepository.findOneBy({
      id: idValue,
    });
    console.log('connectedUser requete remove user', connectedUser);
    console.log('user trouvé', oneUserFound);

    //-------------------------Gestion erreur si pas de user dans la BDD -------//

    if (!oneUserFound) {
      throw new NotFoundException("Cette utilisateur n'existe pas");
    }
    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (
      oneUserFound.id !== connectedUser.id &&
      connectedUser.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    try {
      const result = await this.userRepository.delete({
        id: connectedUser.id,
      });
      console.log('valeur du result par id', result);
      if (result.affected !== 0) {
        return `Cette action a supprimé l'utilisateur ${oneUserFound.nickname}`;
      }
    } catch (error) {
      ('Impossible de supprimer le user ');
      console.log(error);
    }
  }
}
