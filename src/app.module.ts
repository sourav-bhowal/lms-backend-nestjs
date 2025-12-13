import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  // Decorator (Module - It is a module class that is used to define the dependencies of the application)
  imports: [AuthModule, UserModule],
  controllers: [AppController], // Controllers (It is a controller class that is used to handle the incoming requests)
  providers: [AppService], // Providers (It is a provider class that is used to provide data to the controller)
})
export class AppModule {}
