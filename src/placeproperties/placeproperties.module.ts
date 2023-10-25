import { Module } from '@nestjs/common';
import { PlacepropertiesService } from './placeproperties.service';
import { PlacepropertiesController } from './placeproperties.controller';

@Module({
  controllers: [PlacepropertiesController],
  providers: [PlacepropertiesService],
})
export class PlacepropertiesModule {}
