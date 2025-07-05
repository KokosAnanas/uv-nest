import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  })


  app.useStaticAssets(join(__dirname, '..', 'public'), {prefix: '/public'});
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });



  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
