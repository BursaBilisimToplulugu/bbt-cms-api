import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'bbt-cms-api v1.0.0';
  }
}
