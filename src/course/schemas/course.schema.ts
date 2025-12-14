import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: number;

  @Prop()
  level?: string;

  @Prop({ default: Date.now })
  createdAt: Date; // Define a property 'createdAt' of type Date with a default value of the current date

  @Prop({ default: Date.now })
  updatedAt: Date; // Define a property 'updatedAt' of type Date with a default value of the current date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export type CourseDocument = HydratedDocument<Course>;

export const CourseSchema = SchemaFactory.createForClass(Course);
