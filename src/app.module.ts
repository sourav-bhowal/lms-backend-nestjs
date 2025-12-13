import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CourseModule } from './course/course.module';

@Module({
  // Decorator (Module - It is a module class that is used to define the dependencies of the application)
  imports: [
    ConfigModule.forRoot(), // Environment variables
    MongooseModule.forRoot(process.env.MONGO_DB_URL as string), // Database connection
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 1 minute
          limit: 10, // limit each IP to 10 requests per ttl
        },
      ],
    }),
    AuthModule,
    UserModule,
    CourseModule,
  ], // Imports (It is a module class that is used to import other modules)
  controllers: [AppController], // Controllers (It is a controller class that is used to handle the incoming requests)
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ], // Providers (It is a provider class that is used to provide data to the controller)
})
export class AppModule {}
