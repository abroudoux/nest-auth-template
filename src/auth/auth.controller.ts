import { Post, Get, Controller, Body, UseGuards, Req } from "@nestjs/common";

import { AuthService } from "@/auth/auth.service";
import { JwtAuthGuard } from "@/auth/jwt.auth-guard";
import { RequestWithUser } from "./jwt.strategy";
import { UsersService } from "@/users/users.service";


export type AuthBody = { 
    email : string, 
    password : string
};

@Controller('auth')
export class AuthController {

    constructor (private readonly authService : AuthService, private readonly userService : UsersService) {};

    @Post('login')
    async login(@Body() authBody : AuthBody) {
        return await this.authService.login({ authBody });
    };

    @UseGuards(JwtAuthGuard)
    @Get()
    async authenticateUser(@Req() request : RequestWithUser) {
        return await this.userService.getUser({ userId : request.user.userId });
    };

};
