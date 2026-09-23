import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';

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
}
