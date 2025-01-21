import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './images.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveImage(file: Express.Multer.File, userId: number): Promise<Image> {
    const image = new Image();
    image.filename = file.filename;
    image.path = file.path;
    const user = await this.userRepository.findOne(userId, { relations: ['profileImage'] });
    if (user) {
      image.user = user;
      if (!user.profileImage) {
        user.profileImage = [];
      }
      user.profileImage.push(image);
      try {
        await this.userRepository.save(user);
      } catch (error) {
        console.log(error);
      }
    }
    return await this.imageRepository.save(image);
  }

  async findLastImageById(id: number): Promise<Image> {
    return await this.imageRepository.findOne({
      where: {
        user: id,
      },
      order: {
        id: 'DESC',
      },
    });
  }
}