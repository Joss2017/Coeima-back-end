import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';

//-----------------------------------Création de la méthode du JWT---------------------------------------------//
dotenv.config({ path: './env/.env.local' });
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<User> {
    console.log('validate');
    const { id } = payload;
    const user: User = await this.userRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
