import { Test, TestingModule } from '@nestjs/testing';
import { PlacepropertiesController } from './placeproperties.controller';
import { PlacepropertiesService } from './placeproperties.service';

describe('PlacepropertiesController', () => {
  let controller: PlacepropertiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacepropertiesController],
      providers: [PlacepropertiesService],
    }).compile();

    controller = module.get<PlacepropertiesController>(PlacepropertiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
