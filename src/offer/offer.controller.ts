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
import { RoleEnumType } from 'src/user/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(+id);
  }
  @Post()
  // @UseGuards(AuthGuard())
  // @UseGuards(RolesGuard)
  // @Roles(RoleEnumType.ADMIN)
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard())
  // @UseGuards(RolesGuard)
  // @Roles(RoleEnumType.ADMIN)
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard())
  // @UseGuards(RolesGuard)
  // @Roles(RoleEnumType.ADMIN)
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }
}
