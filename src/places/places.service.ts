import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
  ) {}

  create(createPlaceDto: CreatePlaceDto) {
    return this.placeRepository.save(createPlaceDto);
  }

  findAll() {
    return this.placeRepository.find();
  }

  findOne(id: Place['id']) {
    return this.placeRepository.findOne({ where: { id } });
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto) {
    const foundPlace = await this.placeRepository.findOne({ where: { id } });
    foundPlace.name = updatePlaceDto.name;
    foundPlace.longitude = updatePlaceDto.longitude;
    foundPlace.latitude = updatePlaceDto.latitude;
    foundPlace.open_address = updatePlaceDto.open_address;

    return this.placeRepository.save(foundPlace);
  }

  remove(id: Place['id']) {
    return this.placeRepository.delete({ id });
  }
}
