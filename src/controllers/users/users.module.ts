import { Module } from '@nestjs/common';
import {AppController} from "../../app.controller";
import {UsersController} from "./users.controller";
import {AppService} from "../../app.service";
import {UsersService} from "../../services/users/users.service";

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
