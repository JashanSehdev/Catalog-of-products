import { IsEmail, IsNotEmpty, isString, IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;
}


export class GoogleCredentialDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

}