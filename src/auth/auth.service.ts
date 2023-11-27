import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'src/common/utils/crypto';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto/Auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    const isPasswordMatch = await compare(pass, user.password);
    console.log(isPasswordMatch, { pass, user });
    if (isPasswordMatch) {
      delete user.password;
      return user;
    }
    return null;
  }

  async register(user: RegisterDto) {
    return await this.userService.create(user);
  }

  async login(user: LoginDto) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
