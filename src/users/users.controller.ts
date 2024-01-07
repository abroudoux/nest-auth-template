import { Get, Param, Controller, Patch, Body } from "@nestjs/common";

import { UsersService } from "@/users/users.service";
import { UpdateUserDto } from "@/auth/dto/update-user.dto";


@Controller('users')
export class UsersController {

    constructor (private readonly usersService : UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    };

    @Get('/:userId')
    getUser(@Param('userId') userId : string) {
        return this.usersService.getUser({ userId });
    };

    @Patch('/:userId')
    updateUser(@Param('userId') userId : string, @Body() updateUserDto : UpdateUserDto) {
        return this.usersService.updateUser({ userId }, updateUserDto);
    };

};
