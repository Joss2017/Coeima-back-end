import {
  Injectable,
  InternalServerErrorException,
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

  async updateUser(idValue: string, updateUserDto: UpdateUserDto, user: User) {
    //-------------------------Recherche du user dans la BDD -------------------//

    const userFound = await this.userRepository.findOneBy({
      id: idValue,
    });
    console.log('id requête user pour update', idValue);
    console.log('user trouvé', userFound);

    //-------------------------Gestion erreur si pas de user dans la BDD -------//

    if (!userFound) {
      throw new NotFoundException("Cette utilisateur n'existe pas");
    }

    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (userFound.id !== user.id && user.role !== 'admin') {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }

    //-----Destructuration de l'update afin de rehasher mot de passe ----//

    const { nickname, email, password, phone } = updateUserDto;
    try {
      if (password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        userFound.password = hashedPassword;
      }
      if (nickname !== userFound.nickname) {
        userFound.nickname = nickname;
      }
      if (email !== userFound.email) {
        userFound.email = email;
      }
      if (phone !== userFound.phone) {
        userFound.phone = phone;
      }
      return await this.userRepository.save(userFound);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  //-------------------------------------------------Supprimer un user- -----------------------------------//

  async remove(id: string, user: User) {
    const userFound = await this.userRepository.findOneBy({
      id,
    });
    console.log('id requête user pour update', id);
    console.log('user trouvé', userFound);

    //-------------------------Gestion erreur si pas de user dans la BDD -------//

    if (!userFound) {
      throw new NotFoundException("Cette utilisateur n'existe pas");
    }
    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (userFound.id !== user.id && user.role !== 'admin') {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    try {
      const result = await this.userRepository.delete({
        id,
      });
      console.log('valeur du result par id', result);
      if (result.affected !== 0) {
        return `Cette action a supprimé l'utilisateur ${user.nickname}`;
      }
    } catch (error) {
      throw new error(`Impossible de supprimer le user ${error}`);
    }
  }
}
