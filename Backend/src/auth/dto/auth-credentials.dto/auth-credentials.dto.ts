import { IsNotEmpty, isString, IsString, MinLength } from 'class-validator';


export class AuthCredentialsDto {

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password!: string
}
