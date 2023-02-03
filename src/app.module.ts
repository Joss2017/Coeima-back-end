import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { OfferModule } from './offer/offer.module';
import { Offer } from './offer/entities/offer.entity';
import { TopicModule } from './topic/topic.module';
import { Topic } from './topic/entities/topic.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';

dotenv.config({ path: '.env.local' });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Topic, Offer, Message, Comment],
      synchronize: process.env.MODE === 'DEV' ? true : false,
    }),
    UserModule,
    OfferModule,
    TopicModule,
    CommentModule,
    MessageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
