import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto ';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //------------------------------Ici la route vers service=>user crée son profil---------------------------------//

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  //------------------------------Ici la route vers service=>user connexion profil---------------------------------//

  @Post('/login')
  login(@Body() loginDto: LoginAuthDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}
