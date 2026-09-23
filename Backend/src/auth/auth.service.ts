import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';

type safeUser = Omit<User, 'password'>
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService : UsersService,
        private jwtService: JwtService
    ){}
    
    async SignIn (username : string, pass: string) : Promise<{accessToken: string}>{
        const user = await this.usersService.findOne(username);

        if (user?.password !== pass){
            throw new UnauthorizedException();
        } 

        const payload = { sub: user.userId, username: user.username};
        
        return ({
            accessToken : await this.jwtService.signAsync(payload)
        })

    }

    async register(username: string, pass: string) : Promise<{accessToken: string}>{
        const user = await this.usersService.createUser(username, pass);

        if (!user) throw new Error('Error occur while register')

        const payload = { sub: user.userId, username: user.username};
        
        return ({
            accessToken : await this.jwtService.signAsync(payload)
        })
    }
}
