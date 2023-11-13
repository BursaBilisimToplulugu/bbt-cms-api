import { IsNotEmpty } from '@nestjs/class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  longitude: number;
  @IsNotEmpty()
  latitude: number;
  @IsNotEmpty()
  open_address: string;
}
