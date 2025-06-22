import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {User} from "../../shemas/user";
import {UserDto} from "../../dto/user-dto";
import RejectedValue = jest.RejectedValue;
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../../services/authentication/jwt-auth.guard/jwt-auth.guard.service";
import {UserAuthPipe} from "../../pipes/user.pipe";
import {IUser} from "../../interfaces/user.interface";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}


    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }


    @Get(":id")
    getUserById(@Param('id') id): Promise<User | null> {
        return this.userService.getUserById(id);
    }



    // @UseGuards(JwtAuthGuard)
    @Post()
    sendUser(@Body(UserAuthPipe) data: UserDto): Promise<boolean> {

        return this.userService.checkRegUser(data.login).then((queryRes) => {
            console.log('data reg', queryRes)
            if (queryRes.length === 0) {
                return this.userService.sendUser(data);
            } else {
                console.log('err - user is exists')
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    errorText: 'Пользователь уже существует',
                }, HttpStatus.CONFLICT);
            }
        });

    }

    @UseGuards(AuthGuard('local'))
    @Post(":login")
    authUser(@Body(UserAuthPipe) data: UserDto, @Param('login') login)  {
        return this.userService.login(data);
    }

    @Put(":id")
    updateUsers(@Param('id') id, @Body() data) : Promise<User | null> {
        return this.userService.updateUsers(id, data);
    }

    @Delete()
    deleteUsers() {
        return this.userService.deleteUsers();
    }


    @Delete(":id")
    deleteUserById(@Param('id') id): Promise<User | null> {
        return this.userService.deleteUserById(id);
    }

}
