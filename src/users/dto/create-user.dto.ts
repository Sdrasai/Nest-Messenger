import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  nickName?: string;
}
