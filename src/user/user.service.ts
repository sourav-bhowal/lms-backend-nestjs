import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  createUser(name: string, email: string) {
    // Logic to create a user
    return {
      id: Date.now(),
      name,
      email,
      message: 'User created successfully',
    };
  }
}
