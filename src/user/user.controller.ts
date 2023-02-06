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
import { RoleEnumType, User } from './entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  //---------------------------------------------------ROUTES---------------------------------------------//

  //-------------------------Admin voulant afficher tout les Users-------------------------//

  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsersByAdmin();
  }

  //-----------------------------Route Updater compte User-------------------------//

  @Patch(':id')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() connectedUser: User,
  ): Promise<User> {
    console.log(connectedUser);
    return this.userService.updateUser(updateUserDto, connectedUser);
  }

  //-----------------------------Route  Suppression compte User-------------------------//

  @Delete()
  remove(@Param('id') idValue: string, @GetUser() user: User): Promise<string> {
    return this.userService.remove(idValue, user);
  }
}
