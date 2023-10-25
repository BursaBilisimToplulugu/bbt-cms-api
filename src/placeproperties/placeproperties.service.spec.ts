import { Test, TestingModule } from '@nestjs/testing';
import { PlacepropertiesService } from './placeproperties.service';

describe('PlacepropertiesService', () => {
  let service: PlacepropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlacepropertiesService],
    }).compile();

    service = module.get<PlacepropertiesService>(PlacepropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
