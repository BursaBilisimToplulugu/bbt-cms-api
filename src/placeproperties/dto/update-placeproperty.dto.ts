import { PartialType } from '@nestjs/swagger';
import { CreatePlacepropertyDto } from './create-placeproperty.dto';

export class UpdatePlacepropertyDto extends PartialType(CreatePlacepropertyDto) {}
