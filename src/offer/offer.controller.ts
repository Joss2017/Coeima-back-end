import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { RoleEnumType, User } from 'src/user/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Offer } from './entities/offer.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  //-------------------------Route afficher tout les OFFERS-----------------------------//

  @Get()
  findAll(): Promise<Offer[]> {
    return this.offerService.findAllOffers();
  }

  //-------------------------Route afficher un OFFER-----------------------------------//

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Offer> {
    return this.offerService.findOne(id);
  }

  //-------------------------Route créer un OFFER--------------------------------------//

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  create(
    @Body() createOfferDto: CreateOfferDto,
    @GetUser() user: User,
  ): Promise<Offer> {
    return this.offerService.create(createOfferDto, user);
  }

  //-------------------------Route update un OFFER--------------------------------------//

  @Patch(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateOfferDto: UpdateOfferDto,
    @GetUser() user: User,
  ): Promise<Offer> {
    return this.offerService.update(id, updateOfferDto, user);
  }

  //-------------------------Route delete un OFFER--------------------------------------//

  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  remove(@Param('id') id: string): Promise<Offer | string> {
    return this.offerService.remove(id);
  }
}
