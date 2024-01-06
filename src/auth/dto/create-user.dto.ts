import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail({}, {
        message: "You need to enter a valid email",
    })
    email : string;

    @IsNotEmpty()
    @MinLength(6, {
        message: "You should create a password longer than 6 characters",
    })
    password : string;

    @IsString()
    firstName : string;

};