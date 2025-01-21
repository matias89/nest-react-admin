import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { Course } from './course.entity';
import { CourseQuery } from './course.query';

export interface CourseResult {
  data: Course[];
  total: number;
}

@Injectable()
export class CourseService {
  async save(createCourseDto: CreateCourseDto): Promise<Course> {
    return await Course.create({
      ...createCourseDto,
      dateCreated: new Date(),
    }).save();
  }

  async findAll(courseQuery: CourseQuery): Promise<CourseResult> {

    const { page = 1, limit = 10, order, ...filters } = courseQuery;
    const skip = (page - 1) * limit;

    Object.keys(filters).forEach((key) => {
      filters[key] = ILike(`%${filters[key]}%`);
    });

    const [data, total] = await Course.findAndCount({
      where: { ...filters },
      order: {
        name: Number(order) === 1 ? 'ASC' : 'DESC',
      },
      skip,
      take: limit,
    });

    return { data, total };
  }

  async findById(id: string): Promise<Course> {
    const course = await Course.findOne(id);
    if (!course) {
      throw new HttpException(
        `Could not find course with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findById(id);
    return await Course.create({ id: course.id, ...updateCourseDto }).save();
  }

  async delete(id: string): Promise<string> {
    const course = await this.findById(id);
    await Course.delete(course);
    return id;
  }

  async count(): Promise<number> {
    return await Course.count();
  }
}
