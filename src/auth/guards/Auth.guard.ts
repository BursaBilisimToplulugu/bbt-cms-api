import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/User.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const headerAccessToken = request.headers.authorization;
    console.log({ headerAccessToken });
    if (
      request.cookies?.['access_token'] ||
      (headerAccessToken && headerAccessToken.startsWith('Bearer'))
    ) {
      const user = await this.userRepository.findOne({
        where: {
          access_token:
            request.cookies['access_token'] || headerAccessToken.split(' ')[1],
        },
      });
      return !!user;
    } else {
      throw new UnauthorizedException('Yetkisiz İşlem !');
    }
  }
}
