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
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // -----------------------------------------------Méthode de création USER-------------------------------//

  async register(createUserDto: CreateAuthDto) {
    const { nickname, email, password, phone, role } = createUserDto;
    console.log('register', createUserDto);
    // -----------------------------------------------hashage du mot de passe-------------------------------//

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // -----------------------------------------------Injection TypeOrm d'un user----------------------------//

    const user = this.userRepository.create({
      role,
      nickname,
      email,
      password: hashedPassword,
      phone,
    });
    console.log('user crée', user);
    //---------------------------------------------enregistrement de l'entité user---------------------------//

    try {
      const createdUser = await this.userRepository.save(user);
      console.log('user enregistré', user);
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
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({
      email,
    });

    console.log('je veux ton mail-----------', email);
    console.log('je veux ton mdp------------', password);
    console.log('je veux ton user------------', user);

    // ----------------------------------------Ici comparasaison du MP Hashé-------------------------------//

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      console.log('valeur du user dans payload', payload);
      // ----------------------------------------Génération du token---------------------------------------//

      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('identifiants erronés');
    }
  }
}
