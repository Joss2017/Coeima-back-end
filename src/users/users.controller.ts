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
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //---------------------------------------------------ROUTES---------------------------------------------//

  //-------------------------Admin voulant trouver tout les Users-------------------------//

  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsersByAdmin();
  }

  //-----------------------------Route Updater son compte-------------------------//

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    console.log(user);
    return this.usersService.updateUser(id, updateUserDto, user);
  }

  //-----------------------------Route  Suppression compte-------------------------//

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.usersService.remove(id, user);
  }
}
