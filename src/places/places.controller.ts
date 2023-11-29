import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/Auth.guard';
import { RoleGuard } from 'src/auth/guards/Role.guard';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import { PlacesService } from './places.service';

@Controller('places')
@ApiTags('Places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'longitude', 'latitude', 'open_address', 'photos'],
      properties: {
        name: {
          type: 'string',
        },
        longitude: {
          type: 'number',
        },
        latitude: {
          type: 'number',
        },
        open_address: {
          type: 'string',
        },
        photos: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('photos'))
  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  async create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    photos: Express.Multer.File[],
    @Body() createPlaceDto: CreatePlaceDto,
  ) {
    return await this.placesService.create(createPlaceDto, photos);
  }

  @Get()
  findAll() {
    return this.placesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.placesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    return this.placesService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param('id') id: Place['id']) {
    return this.placesService.remove(id);
  }
}
