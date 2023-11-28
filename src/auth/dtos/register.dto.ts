import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterDto {
  @IsOptional()
  @ApiProperty()
  full_name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Şifreniz en az 8 karakterden oluşmalı' })
  @ApiProperty()
  password: string;
}
