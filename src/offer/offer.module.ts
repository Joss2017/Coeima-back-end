import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer]),
    AuthModule,
    MulterModule.register({ dest: './pictures' }),
  ],

  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
