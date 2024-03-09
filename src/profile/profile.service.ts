import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/User.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/Profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async updateProfile(user: User, payload: UpdateProfileDto) {
    const { id } = user;
    const foundUser = await this.userRepository.findOne({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException('User does not exist!');
    }
    await this.userRepository.update({ id }, payload);
  }
}
