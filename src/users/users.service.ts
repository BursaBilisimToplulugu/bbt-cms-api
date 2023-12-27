import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { StorageService } from 'src/storage/storage.service';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private storageService: StorageService,
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
    if (user.role !== 'admin' && user.id !== id)
      throw new ForbiddenException('You can not update other users');
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
    return user;
  }

  async getProfileFromToken(token: string) {
    if (!token) return null;
    const decodedJwt = jwt.decode(token, { json: true });
    return await this.getProfileFromEmail(decodedJwt.email);
  }

  async updateProfilePicture(user: User, file: Express.Multer.File) {
    const folderName = await this.storageService.createNewFolder(
      `profile-pictures/${user.email}`,
      'profile-pictures',
    );
    const url = await this.storageService.save(
      `${folderName}/${file.originalname}`,
      'bbt-maps-bucket',
      file.buffer,
      [{ mediaId: `${user.email}-${new Date(Date.now()).toISOString()}` }],
    );
    user.picture_url = url;
    return await this.userRepository.save(user);
  }
}
