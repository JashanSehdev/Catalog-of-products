import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

type safeUser = Omit<User, 'password'>;
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async SignIn(
    username: string,
    pass: string,
    res: Response
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };

    const accessToken = await this.jwtService.signAsync(payload);

    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true
    })

    return {
      accessToken
    };
  }

  async register(
    username: string,
    pass: string,
    res: Response
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.createUser(username, pass);

    if (!user) throw new Error('Error occur while register');

    const payload = { sub: user.userId, username: user.username };

    const accessToken = await this.jwtService.signAsync(payload);

    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure:  true
    })
    return {
      accessToken
    };
  }
}
