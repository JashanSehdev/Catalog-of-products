import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';
import { User } from '../users/users.service.js';
import { AuthCredentialsDto } from './dto/auth-credentials.dto/auth-credentials.dto.js';

type safeUser = Omit<User, 'password'>
@Controller('auth')
export class AuthController {
    constructor(private readonly authServices : AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    SignIn(@Body() signInDto : Record <string, any>){
        return this.authServices.SignIn(signInDto.username, signInDto.password)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req : any){
        return req.user;
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() credentialsDto: AuthCredentialsDto) {
        return this.authServices.register(credentialsDto.username, credentialsDto.password);
    }
}
