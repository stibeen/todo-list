import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createTaskInput: CreateTaskInput) {
      const createTask = await this.prisma.task.create({
        data: {
          title: createTaskInput.title,
          authorId: userId,
        },
      });

    return {
      success: true,
      message: 'Task created successfully',
      task: createTask,
    }
  }

  async findAll() {
    const [tasks, count] = await this.prisma.$transaction([
      this.prisma.task.findMany({include: {author: true}}),
      this.prisma.task.count()
    ])
    return {
      tasks: tasks,
      count: count,
      message: 'Tasks fetched successfully',
    };
  }

  async findOne(id: string) {
    return await this.prisma.task.findUnique({ where: { id }, include: { author: true } });
  }

  async update(id: string, updateTaskInput: UpdateTaskInput) {
    return await this.prisma.task.update({ where: { id }, data: updateTaskInput });
  }

  async remove(id: string) {
    return await this.prisma.task.delete({ where: { id } });
  }

  async removeAll() {
    const removeAll = await this.prisma.task.deleteMany();
    return {
      success: true,
      message: 'All tasks removed successfully',
      tasks: removeAll,
    }
  }
}
