import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //--------------------Permet d'utiliser class validator dans le projet Nest---------------------//
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  //--------------------Autorise les requêtes avec en-tête HTTP----------------------------------//

  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST,PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(process.env.PORT);
  console.log(`l'api est en route sur le port ${process.env.PORT} `);
}
bootstrap();
