import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// NestFactory - It is a factory class that is used to create the Nest application
async function bootstrap() {
  const app = await NestFactory.create(AppModule); // AppModule - It is a module class that is used to define the dependencies of the application
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe()); // Enable validation globally
  await app.listen(process.env.PORT ?? 3000); // Listen - It is a method that is used to listen for the incoming requests
}
bootstrap();
