import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  UseGuards,
  HttpStatus,
  HttpCode,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/schemas/user.types';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard, RolesGuard) // Protect the route with AuthGuard
  @Roles(UserRole.ADMIN) // Only ADMIN can create courses
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @Req() req: Express.Request,
  ) {
    const userId = req.user?.sub;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const title = createCourseDto.title;

    const existingCourse = await this.courseService.findByTitle(title);

    if (existingCourse) {
      throw new ConflictException('A course with this title already exists.');
    }

    return this.courseService.createCourse(createCourseDto, userId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Only ADMIN can update courses
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Only ADMIN can delete courses
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
