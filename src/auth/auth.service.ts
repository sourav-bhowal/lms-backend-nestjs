import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {} // Inject UserService

  // Add authentication related methods here
  signUp(name: string, email: string) {
    const user = this.userService.createUser(name, email);
    return user;
  }
}
