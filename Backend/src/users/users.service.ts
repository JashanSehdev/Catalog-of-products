import { ConflictException, Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private id = 3;
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
  async createUser(username: string, password : string) : Promise<User | undefined> {
    const existingUser =  await this.findOne(username);

    if (existingUser) throw new ConflictException('User Already Exist');
    const user = {
        userId: this.id,
        username,
        password
    }
    this.id = this.id + 1
    this.users.push(user);

    return this.findOne(username);
  }
}
