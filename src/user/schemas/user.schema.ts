import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { UserRole } from './user.types';

export type UserDocument = HydratedDocument<User>; // Define a type alias for User document

// Define the User schema using decorators
@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string; // Define a property 'name' of type string

  @Prop({ unique: true, required: true })
  email: string; // Define a property 'email' of type string

  @Prop({ required: true })
  password: string; // Define a property 'password' of type string

  @Prop({ default: UserRole.STUDENT, enum: UserRole })
  role: UserRole; // Define a property 'role' of type UserRole with a default value of 'student'

  @Prop({ default: true })
  isActive: boolean; // Define a property 'isActive' of type boolean with a default value of true

  @Prop({ default: Date.now })
  createdAt: Date; // Define a property 'createdAt' of type Date with a default value of the current date

  @Prop({ default: Date.now })
  updatedAt: Date; // Define a property 'updatedAt' of type Date with a default value of the current date
}

export const UserSchema = SchemaFactory.createForClass(User); // Create a Mongoose schema from the User class
