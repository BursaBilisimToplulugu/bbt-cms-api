import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/users/users.service';
import { User } from '../users/entities/User.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
