import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Importing User schema
  ],
  providers: [UserService],
  exports: [UserService], // Exporting UserService to be used in other modules
})
export class UserModule {}
