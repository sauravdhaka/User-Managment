import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email, password },
      select: ['id', 'first_name', 'last_name', 'email'], // Exclude password
    });

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // Ensure user exists
    try {
      await this.userRepository.update(id, {
        ...updateUserDto,
        modified_at: new Date(), // Use modified_at
      });

      return { ...user, ...updateUserDto, modified_at: new Date() };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async softDelete(id: number): Promise<void> {
    await this.findOne(id); // Ensure user exists
    try {
      await this.userRepository.update(id, { deleted_at: new Date() });
    } catch (error) {
      throw new InternalServerErrorException('Failed to soft delete user');
    }
  }

  async hardDelete(id: number): Promise<void> {
    await this.findOne(id); // Ensure user exists
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
