import { Controller, Post, Get, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageService } from './images.service';
import { Image } from './images.entity';
import { plainToClass } from 'class-transformer';
import { join } from 'path';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/:userId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '..', 'frontend', 'public', 'uploads'),
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: number,
  ): Promise<Partial<Image>> {
    const image = await this.imageService.saveImage(file, userId);

    const { user, ...imageWithoutUser } = image;
    return imageWithoutUser;
  }

  @Get('last/:userId')
  async findLastImageById(@Param('userId') userId: number): Promise<Partial<Image>> {
    const image = await this.imageService.findLastImageById(userId);
    return plainToClass(Image, image);
  }
}