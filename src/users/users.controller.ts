import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //---------------------------------------------------ROUTES ROLE USER---------------------------------------------//

  findUser(@Param('id') id: string, @GetUser() user: User): Promise<User> {
    return this.usersService.findOneUser(id, user);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
    @GetUser() user: User,
  ) {
    console.log(user);
    return this.usersService.updateUser(id, updateUser, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.usersService.remove(id, user);
  }

  //-----------------------------------------ROUTES ROLE ADMIN-------------------------------------------------//

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  findOneUser(@Param('id') id: string, @GetUser() user: User): Promise<User> {
    return this.usersService.findOneUser(id, user);
  }
}
