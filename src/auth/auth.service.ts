import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // Find user by email and pass
    const user = await this.userService.findByEmailAndPassword(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }



    // Generate JWT token
    const token = this.generateJwt(user);

    return {
      message: 'Login successful',
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  private generateJwt(user: User): string {
    return this.jwtService.sign(
      { id: user.id, email: user.email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      },
    );
  }
}
