import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';
import { DeleteResult } from 'typeorm/browser';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findUserByEmail(createUserDto.email);

    if (existingUser) throw new ConflictException('User already Exist');

    const hashed_password = await bcrypt.hash(createUserDto.password, 10);
    const user: User = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = hashed_password;
    user.role = createUserDto.role
    return this.userRepository.save(user);
  }

  async createIfNew(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findUserByEmail(createUserDto.email);
    if (existingUser) return existingUser;
    const user: User = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.role = createUserDto.role
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  removeUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
