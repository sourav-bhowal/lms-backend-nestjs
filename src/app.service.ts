import { Injectable } from '@nestjs/common';

@Injectable() // Decorator (Injectable - It is a service class that is used to provide data to the controller)
export class AppService {
  getHello(): string {
    return 'Hello World!74';
  }

  getAbout(): string {
    return 'About';
  }
}
