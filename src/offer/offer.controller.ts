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
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleEnumType, User } from 'src/user/entities/user.entity';
import { Roles } from 'src/decorator/roles.decorator';
import { Offer } from './entities/offer.entity';
import { GetUser } from 'src/decorator/get-user.decorator';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  //-------------------------Route afficher tout les OFFERS-----------------------------//

  @Get()
  findAllOffers(): Promise<Offer[]> {
    return this.offerService.findAllOffers();
  }

  //-------------------------Route afficher un OFFER-----------------------------------//

  @Get(':id')
  findOneOffer(@Param('id') idValue: string): Promise<Offer> {
    return this.offerService.findOneOffer(idValue);
  }

  //-------------------------Route créer un OFFER--------------------------------------//

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  createOfferByAdmin(
    @Body() createOfferDto: CreateOfferDto,
    @GetUser() connectedUser: User,
  ): Promise<Offer> {
    return this.offerService.createOfferByAdmin(createOfferDto, connectedUser);
  }

  //-------------------------Route update un OFFER--------------------------------------//

  @Patch(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  updateOfferByAdmin(
    @Param('id') idValue: string,
    @Body() updateOfferDto: UpdateOfferDto,
    @GetUser() connectedUser: User,
  ): Promise<Offer> {
    return this.offerService.updateOfferByAdmin(
      idValue,
      updateOfferDto,
      connectedUser,
    );
  }

  //-------------------------Route delete un OFFER--------------------------------------//

  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  removeOfferByAdmin(@Param('id') idValue: string): Promise<Offer | string> {
    return this.offerService.removeOfferByAdmin(idValue);
  }
}
