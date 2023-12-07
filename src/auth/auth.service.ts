import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from '../users/entities/User.entity';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register({ password, email, ...rest }: RegisterDto) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return { message: 'Bu email ile daha önce kayıt olunmuş' };
    }
    const cryptedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      password: cryptedPassword,
      email,
      ...rest,
    });
    const savedUser = await this.userRepository.save(newUser);
    delete savedUser.password;
    return savedUser;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email or password is wrong');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is wrong');
    }
    const access_token = jwt.sign(
      { email, id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '10s',
      },
    );
    const refresh_token = jwt.sign(
      { email, id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '999d',
      },
    );
    const updatedUser = await this.userRepository.save({
      ...user,
      access_token,
      refresh_token,
    });
    delete updatedUser.password;
    return {
      access_token,
      ...updatedUser,
    };
  }

  async logout(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.access_token = null;
    await this.userRepository.save(user);
    return { message: 'Logout successful' };
  }

  async refresh(refresh_token: string) {
    const decodedRefreshToken = jwt.decode(refresh_token, { json: true });
    const { id } = decodedRefreshToken;
    const foundUser = await this.userRepository.findOne({
      where: { id, refresh_token },
    });
    if (!foundUser) throw new BadRequestException('Refresh token is invalid');
    const newAccessToken = jwt.sign(
      { email: foundUser.email, id: foundUser.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '9999d',
      },
    );
    return await this.userRepository.save({
      ...foundUser,
      access_token: newAccessToken,
    });
  }
}
