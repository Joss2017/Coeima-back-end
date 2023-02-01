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
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  //-------------------------------------------------METHODES-------------------------------------------------------//

  //-------------------------------------------------Trouver un User---------------------------------------//

  async findUser(idValue: string, user: User): Promise<User> {
    try {
      const userFound = await this.usersRepository.findOneBy({
        id: idValue,
      });
      console.log('id utilisateur----------------', user.id);
      return userFound;
    } catch (error) {
      if (error) {
        throw new NotFoundException(
          `pas d'utilisateur trouvé avec l'id:${idValue}`,
        );
      }
    }
  }

  //-------------------------------------------------------------------------------------------------------//

  //-------------------------------------------------Mettre à jour un user--------------------------------//

  async updateUser(idValue: string, updateUser: UpdateUserDto, user: User) {
    //-------------------------Recherche du user dans la BDD -------------------//

    const updateUserFound = await this.usersRepository.findOneBy({
      id: idValue,
    });
    console.log('id requête utilisateur', idValue);
    console.log('id utilisateur', user.id);

    //-------------------------Gestion erreur si pas de user dans la BDD -------//

    if (!updateUserFound) {
      throw new NotFoundException("Cette utilisateur n'existe pas");
    }

    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (updateUserFound.id !== user.id) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }

    //-----Destructuration de l'update afin de vérifier si doublon dans BDD ----//

    const { email, nickname, password } = updateUser;

    console.log(updateUser.nickname);
    try {
      updateUserFound.email = email;

      if (password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        updateUserFound.password = hashedPassword;
      }

      updateUserFound.nickname = nickname;

      return await this.usersRepository.save(updateUserFound);
    } catch {
      throw new Error("Autre erreur, merci de contacter l'administrateur");
    }
  }

  //-------------------------------------------------------------------------------------------------------//

  //-------------------------------------------------Supprimer un user- -----------------------------------//

  async remove(id: string, user: User): Promise<User | string> {
    const result = await this.usersRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`pas d'utilisateur trouvé avec l'id:${id}`);
    }
    return `Cette action a supprimé l'utilisateur ${user}`;
  }

  //-------------------------------------------------------------------------------------------------------//

  //-----------------------------------------------------METHODES ADMIN-------------------------------------------//

  //-------------------------------------------------Trouver tout les Users--------------------------------//

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  //-------------------------------------------------------------------------------------------------------//

  //-------------------------------------------------Trouver un User---------------------------------------//

  async findOneUser(idValue: string, user: User): Promise<User> {
    try {
      const userFound = await this.usersRepository.findOneBy({
        id: idValue,
      });
      console.log('id utilisateur----------------', user.id);
      return userFound;
    } catch (error) {
      if (error) {
        throw new NotFoundException(
          `pas d'utilisateur trouvé avec l'id:${idValue}`,
        );
      }
    }
  }

  //-------------------------------------------------------------------------------------------------------//

  //-------------------------------------------------Suppression d'un user- --------------------------------//

  //-------------------------------------------------------------------------------------------------------//
}
