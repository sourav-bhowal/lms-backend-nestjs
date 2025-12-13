import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../auth/dto/signUp.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  // Injecting the User model to interact with the database
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(signUpDto: SignUpDto): Promise<User> {
    return await this.userModel.create(signUpDto); // Creating a new user document in the database
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec(); // Finding a user by email
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).select('-password').exec(); // Finding a user by ID and excluding the password field
  }
}
