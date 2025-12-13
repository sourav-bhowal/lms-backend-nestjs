import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService], // Exporting UserService to be used in other modules
})
export class UserModule {}
