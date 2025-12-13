import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Decorator (Controller - It is a controller class that is used to handle the incoming requests)
export class AppController {
  constructor(private readonly appService: AppService) {} // Dependency Injection (It is a design pattern that is used to inject the dependencies into the class)

  @Get() // Decorator (Get - It is a method that is used to handle the GET requests)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('about')
  getAbout(): string {
    return this.appService.getAbout();
  }
}
