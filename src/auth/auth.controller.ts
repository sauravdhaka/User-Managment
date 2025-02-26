import { 
  Controller, 
  Post, 
  Body, 
  UnauthorizedException, 
  BadRequestException 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  async login(@Body() loginDto: LoginDto) {
    try {
      // Check if email and password are provided
      if (!loginDto.email || !loginDto.password) {
        throw new BadRequestException('Email and password are required');
      }

      // Attempt login
      const token = await this.authService.login(loginDto);
      return { message: 'Login successful', token };
      
    } catch (error) {
      // Handle unauthorized or other errors
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid email or password');
      }
      throw new BadRequestException(error.message || 'Login failed');
    }
  }
}
