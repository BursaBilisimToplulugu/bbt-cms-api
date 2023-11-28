import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async create(user: Partial<User>): Promise<User> {
    const cryptedPassword = await bcrypt.hash(user.password, 10);
    delete user.password;
    const newuser = this.userRepository.create({
      password: cryptedPassword,
      ...user,
    });
    return this.userRepository.save(newuser);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
  async getProfileFromEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    delete user.password;
    delete user.access_token;
    return user;
  }

  async getProfileFromToken(token: string) {
    const decodedJwt = jwt.decode(token, { json: true });
    return await this.getProfileFromEmail(decodedJwt.email);
  }
}
