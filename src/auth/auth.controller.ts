import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Define the route prefix for this controller
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: { name: string; email: string }) {
    // Expecting name and email in the request body
    return this.authService.signUp(body.name, body.email);
  }
}
