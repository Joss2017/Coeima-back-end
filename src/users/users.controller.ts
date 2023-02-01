import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //---------------------------------------------------ROUTES ROLE USER---------------------------------------------//

  //-----------------------------Route User voulant Update son compte-------------------------//

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    console.log(user);
    return this.usersService.updateUser(id, updateUserDto, user);
  }

  //-----------------------------Route User voulant Supprimer son compte-------------------------//

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.usersService.remove(id, user);
  }

  //-----------------------------------------ROUTES ROLE ADMIN-------------------------------------------------//

  //-------------------------Route Admin voulant trouver tout les Users-------------------------//

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  //-------------------------Route Admin voulant trouver un User-------------------------------//

  findOneUser(@Param('id') id: string, @GetUser() user: User): Promise<User> {
    return this.usersService.findOneUser(id, user);
  }

  //-------------------------Route Admin voulant supprimer un User-----------------------------//

  @Delete(':id')
  removeByAdmin(@Param('id') id: string, @GetUser() user: User) {
    return this.usersService.removeByAdmin(id, user);
  }
}
