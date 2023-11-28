import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/users/users.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const accessToken = request.cookies?.access_token;
    const user = await this.userService.getProfileFromToken(accessToken);
    console.log({ user });
    if (user.role === 'admin') return true;
    throw new ForbiddenException('Bu işlemi yapmaya yetkiniz yok');
  }
}
