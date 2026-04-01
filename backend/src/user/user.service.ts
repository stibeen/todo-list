import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor (private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    return await this.prisma.user.create({
      data: createUserInput,
    });
  }

  async findAll() {
  const [users, totalUser] = await this.prisma.$transaction([
    this.prisma.user.findMany({include: {tasks: true}}),
    this.prisma.user.count()
  ]);
    return {
      users: users,
      total: totalUser,
      success: true,
      message: 'Users fetched successfully',
    }
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
