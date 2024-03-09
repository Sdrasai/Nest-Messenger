import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  password?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  phoneNumber?: string;
  @IsOptional()
  nickName?: string;
}
