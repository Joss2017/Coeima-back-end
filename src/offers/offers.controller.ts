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
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { RoleEnumType } from 'src/users/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
  @Post()
  @UseGuards(AuthGuard())
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  remove(@Param('id') id: string) {
    return this.offersService.remove(+id);
  }
}
