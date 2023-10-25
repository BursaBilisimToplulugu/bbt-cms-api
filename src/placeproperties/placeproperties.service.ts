import { Injectable } from '@nestjs/common';
import { CreatePlacepropertyDto } from './dto/create-placeproperty.dto';
import { UpdatePlacepropertyDto } from './dto/update-placeproperty.dto';

@Injectable()
export class PlacepropertiesService {
  create(createPlacepropertyDto: CreatePlacepropertyDto) {
    return 'This action adds a new placeproperty';
  }

  findAll() {
    return `This action returns all placeproperties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} placeproperty`;
  }

  update(id: number, updatePlacepropertyDto: UpdatePlacepropertyDto) {
    return `This action updates a #${id} placeproperty`;
  }

  remove(id: number) {
    return `This action removes a #${id} placeproperty`;
  }
}
