import { Injectable } from '@nestjs/common';

export type Buckets = 'profile-pictures' | 'place-pictures' | 'bbt-maps-bucket';

@Injectable()
export class StorageService {
  // storage: Storage;
  // constructor() {
  //   this.storage = new Storage({
  //     projectId: StorageConfig.projectId,
  //     credentials: {
  //       client_email: StorageConfig.clientEmail,
  //       private_key: StorageConfig.privateKey,
  //     },
  //   });
  // }
  // async saveMultiple(
  //   photoObjects: {
  //     path: string;
  //     bucket: Buckets;
  //     media: ArrayBuffer;
  //     metadata: { [key: string]: string }[];
  //   }[],
  // ): Promise<string[]> {
  //   console.log('saveMultiple');
  //   const allUrls = await Promise.all(
  //     photoObjects.map(async (photoObject, index) => {
  //       console.log('uploading photo', index);
  //       const { path, bucket, media, metadata } = photoObject;
  //       const object = metadata.reduce(
  //         (obj, item) => Object.assign(obj, item),
  //         {},
  //       );
  //       const file = this.storage.bucket(bucket).file(path);
  //       const stream = file.createWriteStream();
  //       await new Promise((resolve, reject) => {
  //         stream.on('finish', resolve);
  //         stream.on('error', reject);
  //         sharp(media)
  //           .webp({ quality: 80 })
  //           .toBuffer()
  //           .then((data) => {
  //             stream.end(data);
  //           });
  //       });
  //       await file.setMetadata({
  //         metadata: object,
  //       });
  //       console.log('finish uploading photo', index);
  //       return file.publicUrl();
  //     }),
  //   );
  //   console.log('got urls');
  //   return allUrls;
  // }
  // async save(
  //   path: string,
  //   bucket: Buckets,
  //   media: Buffer,
  //   metadata: { [key: string]: string }[],
  // ) {
  //   const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
  //   const file = this.storage.bucket(bucket).file(path);
  //   const stream = file.createWriteStream();
  //   stream.on('finish', async () => {
  //     return await file.setMetadata({
  //       metadata: object,
  //     });
  //   });
  //   stream.end(media);
  //   return file.publicUrl();
  // }
  // async delete(path: string, bucket: Buckets) {
  //   await this.storage
  //     .bucket(bucket)
  //     .file(path)
  //     .delete({ ignoreNotFound: true });
  // }
  // async get(path: string, bucket: Buckets): Promise<StorageFile> {
  //   const fileResponse: DownloadResponse = await this.storage
  //     .bucket(bucket)
  //     .file(path)
  //     .download();
  //   const [buffer] = fileResponse;
  //   const storageFile = new StorageFile();
  //   storageFile.buffer = buffer;
  //   storageFile.metadata = new Map<string, string>();
  //   return storageFile;
  // }
  // async createNewFolder(path: string, bucket: Buckets) {
  //   const isFolderExist = await this.storage.bucket(bucket).file(path).exists();
  //   if (!isFolderExist) {
  //     await this.storage.bucket(bucket).file(path).save('');
  //   }
  //   return this.storage.bucket(bucket).file(path).name;
  // }
}
