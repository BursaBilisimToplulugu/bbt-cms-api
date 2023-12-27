import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sharp from 'sharp';
import { Buckets, StorageService } from 'src/storage/storage.service';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
    private storageService: StorageService,
  ) {}

  async create({ ...payload }: CreatePlaceDto, photos: Express.Multer.File[]) {
    const photoUrls = await this.uploadPhotos(photos, payload.name);
    return this.placeRepository.save({
      photos: photoUrls.map((url) => ({ url })),
      ...payload,
    });
  }

  async findAll() {
    return await this.placeRepository.find({
      relations: { photos: true, comments: true },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: Place['id']) {
    return await this.placeRepository.findOne({
      where: { id },
      relations: { photos: true, comments: true },
    });
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

  async uploadPhotos(files: Express.Multer.File[], placeName: Place['name']) {
    console.log('uploading photos');
    const folderName = await this.storageService.createNewFolder(
      placeName,
      'place-pictures',
    );
    const photosPromise = files.map(async (photo) => {
      const fileBuffer = photo.buffer as ArrayBuffer;
      const photoObj = {
        path: `${folderName}/${photo.originalname}`,
        bucket: 'bbt-maps-bucket' as Buckets,
        media: fileBuffer,
        metadata: [
          { mediaId: `${placeName}-${new Date(Date.now()).toISOString()}` },
        ],
      };
      const pipeline = sharp(fileBuffer);
      photoObj.media = await pipeline
        .resize()
        .jpeg({ quality: 60, progressive: true })
        .withMetadata()
        .toBuffer();

      return photoObj;
    });
    const photoObjects = await Promise.all(photosPromise);
    console.log('got photo objects');
    const photoURLs = await this.storageService.saveMultiple(photoObjects);
    return photoURLs;
  }
}
