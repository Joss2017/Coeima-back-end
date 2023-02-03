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
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  //-------------------------------------------------SERVICES-------------------------------------------------------//

  //------------------------------------------------------ADMIN-------------------------------------------//

  //-------------------------------------------------Trouver tout les Users--------------------------------//

  async findAllUsersByAdmin(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  //------------------------------------------------------User-------------------------------------------//

  //-------------------------------------------------Mettre à jour un user--------------------------------//

  async updateUser(idValue: string, updateUserDto: UpdateUserDto, user: User) {
    //-------------------------Recherche du user dans la BDD -------------------//

    const updateUserFound = await this.usersRepository.findOneBy({
      id: idValue,
    });
    console.log('id requête user pour update', idValue);
    console.log('user trouvé', updateUserFound);

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

    //-----Destructuration de l'update afin de rehasher mot de passe ----//

    const { nickname, email, password, phone } = updateUserDto;
    try {
      if (password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        updateUserFound.password = hashedPassword;
      }
      if (nickname !== updateUserFound.nickname) {
        updateUserFound.nickname = nickname;
      }
      if (email !== updateUserFound.email) {
        updateUserFound.email = email;
      }
      if (phone !== updateUserFound.phone) {
        updateUserFound.phone = phone;
      }
      return await this.usersRepository.save(updateUserFound);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  //-------------------------------------------------Supprimer un user- -----------------------------------//

  async remove(id: string, user: User): Promise<User | string> {
    const result = await this.usersRepository.delete({
      id,
    });
    console.log('résultat du delete par id', result);
    if (result.affected === 0) {
      throw new NotFoundException(`pas d'utilisateur trouvé avec l'id:${id}`);
    }
    return `Cette action a supprimé l'utilisateur ${user.email}`;
  }
  //-------------------------------------------------------------------------------------------------------//
}
