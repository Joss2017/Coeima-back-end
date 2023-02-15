import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

//--------------------Permet de relier au fichier .env.local stockant des données sensibles---------------------//

dotenv.config({ path: './env/.env.local' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); //--------------------Permet d'utiliser class validator dans le projet Nest-----------------------------------//
  app.useGlobalPipes(new ValidationPipe());
  //--------définir un préfixe pour chaque route enregistrée dans une application HTTP--------------------------//
  app.setGlobalPrefix('api');

  //--------------------Le partage de ressources cross-origin Autorise les requêtes  à un autre domaine---------//
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET, PUT, POST,PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  //--------------------Fonction asynchrone permmettant de démarrer l'app avec le port défini-------------------//
  await app.listen(process.env.PORT);
  console.log(`l'api est en route sur le port ${process.env.PORT} `);
}
bootstrap();
