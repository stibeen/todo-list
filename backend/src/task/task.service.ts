import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(createTaskInput: CreateTaskInput) {
    return this.prisma.task.create({ data: createTaskInput });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  update(id: string, updateTaskInput: UpdateTaskInput) {
    return this.prisma.task.update({ where: { id }, data: updateTaskInput });
  }

  remove(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
