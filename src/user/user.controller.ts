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

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  //---------------------------------------------------ROUTES---------------------------------------------//

  //-------------------------Admin voulant trouver tout les Users-------------------------//

  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsersByAdmin();
  }

  //-----------------------------Route Updater son compte-------------------------//

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    console.log(user);
    return this.userService.updateUser(id, updateUserDto, user);
  }

  //-----------------------------Route  Suppression compte-------------------------//

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.userService.remove(id, user);
  }
}
