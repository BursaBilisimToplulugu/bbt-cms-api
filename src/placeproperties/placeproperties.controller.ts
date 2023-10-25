import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlacepropertiesService } from './placeproperties.service';
import { CreatePlacepropertyDto } from './dto/create-placeproperty.dto';
import { UpdatePlacepropertyDto } from './dto/update-placeproperty.dto';

@Controller('placeproperties')
export class PlacepropertiesController {
  constructor(private readonly placepropertiesService: PlacepropertiesService) {}

  @Post()
  create(@Body() createPlacepropertyDto: CreatePlacepropertyDto) {
    return this.placepropertiesService.create(createPlacepropertyDto);
  }

  @Get()
  findAll() {
    return this.placepropertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placepropertiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlacepropertyDto: UpdatePlacepropertyDto) {
    return this.placepropertiesService.update(+id, updatePlacepropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placepropertiesService.remove(+id);
  }
}
