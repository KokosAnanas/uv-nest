import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./controllers/users/users.module";
import {MongooseModule} from "@nestjs/mongoose";
import {NoticesModule} from "./controllers/notices/notices.module";

@Module({
  imports: [
    UsersModule,
    NoticesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest')],
  controllers: [],
  providers: [],
})
export class AppModule {}
