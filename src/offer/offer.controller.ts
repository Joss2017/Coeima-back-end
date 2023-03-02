import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Res,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  //-------------------------Route afficher tout les OFFERS-----------------------------//

  @Get()
  findAllOffers(): Promise<Offer[]> {
    return this.offerService.findAllOffers();
  }
  @Get(':pictureName')
  getFile(
    @Param('pictureName') pictureName: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), `./pictures/${pictureName}`),
    );
    res.set({
      'Content-Type': 'image/png',
    });
    return new StreamableFile(file);
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
  @UseInterceptors(FileInterceptor('picture'))
  createOfferByAdmin(
    @UploadedFile() picture: Express.Multer.File,
    @Body() createOfferDto: CreateOfferDto,
    @GetUser() connectedUser: User,
  ) {
    const offer: CreateOfferDto = {
      ...createOfferDto,
      picture: picture.filename, // inclus le picture dans le dto//
    };
    console.log('picture/upload : ', picture.filename);
    console.log("admin qui crée l'offre : ", connectedUser);
    console.log('recuperation du create offer : ', createOfferDto);

    return this.offerService.createOfferByAdmin(offer, connectedUser);
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
