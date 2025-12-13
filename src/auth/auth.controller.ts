import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './auth.guard';
import express from 'express';

@Controller('auth') // Define the route prefix for this controller
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    // @Body() decorator is used to extract the request body. Dto is used to validate the request body
    const user = await this.authService.signUp(signUpDto); // Call the signUp method from AuthService

    return {
      message: 'User signed up successfully',
      user,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.signIn(signInDto);

    return {
      message: 'User signed in successfully',
      user,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @UseGuards(AuthGuard) // Protect this route with AuthGuard
  async getProfile(@Request() req: express.Request) {
    const userId = (req.user as JwtPayload).sub;

    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'Profile fetched successfully',
      user,
    };
  }
}
