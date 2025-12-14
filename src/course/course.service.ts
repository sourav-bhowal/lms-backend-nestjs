import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto, userId: string) {
    return await this.courseModel.create({
      ...createCourseDto,
      createdBy: new Types.ObjectId(userId),
    });
  }

  async findAll() {
    return await this.courseModel.find().exec();
  }

  async findOne(id: number) {
    return await this.courseModel.findById(id).exec();
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseModel
      .findByIdAndUpdate(id, updateCourseDto, { new: true })
      .exec();
  }

  async remove(id: number) {
    return await this.courseModel.findByIdAndDelete(id).exec();
  }

  async findByTitle(title: string): Promise<Course | null> {
    return await this.courseModel.findOne({ title }).exec();
  }
}
