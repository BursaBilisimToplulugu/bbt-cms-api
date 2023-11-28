import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './storage.service';

@Global()
@Module({
  providers: [ConfigModule, StorageService],
  exports: [StorageService],
})
export class StorageModule {}
