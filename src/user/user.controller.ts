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
import { GetUser } from 'src/decorator/get-user.decorator';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';

//------------------------- par le decorator @Controller => definit le Provider UserModule----------------------------------//

@Controller('user')
//------------------------- par le decorator useGuard => AuthGuard permettant de s'authentifier pour toutes les requêtes----//
@UseGuards(AuthGuard())
//----------------------------------- export de la classe user controller---------------------------------------------------//
export class UserController {
  //-------------------------Constructor avec mise en place paramètre privé pour instancier la classe UserService-----------//
  constructor(private readonly userService: UserService) {}

  //-------------------------Route afficher tout les USERS BY ADMIN-----------------------------//

  @Get()
  //-------------------------par le decorator useGuard => import de la classe RolesGuard-------------------------//
  @UseGuards(RolesGuard)
  //------------------------- RoleEnumType permets de paramétrer le role de l'admin--------//
  @Roles(RoleEnumType.ADMIN)
  //-------------------------Méthode findAllUsers qui par promise renverra un tableau USERS--//
  findAllUsers(): Promise<User[]> {
    //-------------------------instance de la classe userService-----------------------------//
    return this.userService.findAllUsersByAdmin();
  }
  //-------------------------Route afficher un User-----------------------------//

  @Get(':id')

  //-------------------------Méthode findOneUser qui par promise renverra un  USER--//
  findOneUser(
    //-------------------------par le decorator Param=>on paramètre notre requête par l'idValue----//
    @Param('id') idValue: string,
    //-------------------------par le decorator GetUser=> Récupération du user connecté------------//
    @GetUser() connectedUser: User,
  ): Promise<User> {
    //-------------------------instance de la classe userService-----------------------------//
    return this.userService.findOneUser(idValue, connectedUser);
  }

  //-----------------------------Route Updater compte User---------------------------------------------------------//

  //-------------------------Parametrage string id-------------------------------------------------//
  @Patch(':id')
  //-------------------------Méthode updateUser qui par promise renverra un objet User-------------------//
  updateUser(
    //-------------------------par le decorator Param=>on paramètre notre requête par l'idValue----//
    @Param('id') idValue: string,
    //-------------------------par le decorator Body=> récupérations des données entrantes---------------------------//
    @Body() updateUserDto: UpdateUserDto,
    //-------------------------par le decorator GetUser=> Récupération du user connecté------------//
    @GetUser() connectedUser: User,
  ): Promise<User> {
    //-------------------------instance de la classe userService-----------------------------------//
    return this.userService.updateUser(idValue, updateUserDto, connectedUser);
  }

  //-----------------------------Route  Suppression compte User------------------------------------------------------//

  //-------------------------Parametrage string id-------------------------------------------------//
  @Delete(':id')
  //-------------------------Méthode removeUser qui par promise renverra une string----------------//
  removeUser(
    //-------------------------par le decorator Param=>on paramètre notre requête par l'idValue----//
    @Param('id') idValue: string,
    //-------------------------par le decorator GetUser=> Récupération du user connecté------------//
    @GetUser() connectedUser: User,
    //-------------------------instance de la classe userService-----------------------------------//
  ): Promise<string> {
    return this.userService.removeUser(idValue, connectedUser);
  }
}
