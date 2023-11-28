import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  current_password: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Şifreniz en az 8 karakterli olmalı' })
  new_password: string;

  @IsNotEmpty()
  new_password_confirm: string;
}
