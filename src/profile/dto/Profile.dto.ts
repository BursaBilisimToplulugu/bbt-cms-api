import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { User } from 'src/users/entities/User.entity';

export class UpdateProfileDto extends User {
  full_name: string;
  @IsOptional()
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
