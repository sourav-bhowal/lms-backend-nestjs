import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot(), // Import ConfigModule to access environment variables
    UserModule, // Importing UserModule to use UserService
    JwtModule.register({
      // Register JwtModule with secret and sign options
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' }, // Token expiration time set to 600 seconds i.e. 10 minutes
    }),
  ],
})
export class AuthModule {}
