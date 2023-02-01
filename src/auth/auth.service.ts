import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto ';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // -----------------------------------------------Méthode de création USER-------------------------------//

  async register(createUser: CreateAuthDto) {
    const { password } = createUser;

    // -----------------------------------------------hashage du mot de passe-------------------------------//

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // -----------------------------------------------création d'une entité user----------------------------//

    const user = this.usersRepository.create({
      ...createUser,
      password: hashedPassword,
    });

    //---------------------------------------------enregistrement de l'entité user---------------------------//

    try {
      const createdUser = await this.usersRepository.save(user);
      delete createdUser.password;
      return createdUser;
    } catch (error) {
      //------------------------------------------- gestion des erreurs---------------------------------------//

      if (error.code === '23505') {
        throw new ConflictException('Cette utilisateur existe dejà');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // -----------------------------------------------Méthode de connexion USER-------------------------------//

  async login(loginDto: LoginAuthDto) {
    const { role, nickname, email, password } = loginDto;
    const user = await this.usersRepository.findOneBy({ email });

    console.log('je veux ton nom------------', nickname);
    console.log('je veux ton mail-----------', email);
    console.log('je veux ton mdp------------', password);
    console.log('je veux ton role-----------', role);

    // ----------------------------------------Ici comparasaison du MP Hashé-------------------------------//

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { user };
      console.log('je veux ton profil--------', user);

      // ----------------------------------------Ici envoie du Token d'accés-------------------------------//

      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, déso...',
      );
    }
  }
}
