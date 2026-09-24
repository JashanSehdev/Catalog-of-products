import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';
import { User } from '../users/users.service.js';
import { AuthCredentialsDto } from './dto/auth-credentials.dto/auth-credentials.dto.js';
import type { Response } from 'express';

type safeUser = Omit<User, 'password'>;
@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async SignIn(@Body() signInDto: Record<string, any>, @Res() res: Response) {
    const access_token = await this.authServices.SignIn(
      signInDto.username,
      signInDto.password,
    );

    res.cookie('access_token', access_token.accessToken, {
      httpOnly: true,
      secure: true,
    });

  return res.json({message : 'User Logged In'})
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() credentialsDto: AuthCredentialsDto, @Res() res: Response) {
    const access_token = await this.authServices.register(
      credentialsDto.username,
      credentialsDto.password,
    );

    res.cookie('access_token', access_token.accessToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });

    return res.json({message : 'User created'})
  }
}
