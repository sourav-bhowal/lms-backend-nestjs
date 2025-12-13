import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {} // Inject UserService and JwtService

  // Add authentication related methods here
  async signUp(signUpDto: SignUpDto) {
    // Check if user already exists
    const existingUser = await this.userService.findUserByEmail(
      signUpDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password and create a new user
    const hashPassword = await bcrypt.hash(signUpDto.password, 10);

    // Create user with hashed password
    const user = await this.userService.createUser({
      ...signUpDto,
      password: hashPassword,
    });

    // Create JWT token for the user
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
    };

    // Sign the JWT token
    const token = await this.jwtService.signAsync(payload);

    // Return the user data along with the token
    return {
      accessToken: token,
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findUserByEmail(signInDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      accessToken: token,
    };
  }
}
