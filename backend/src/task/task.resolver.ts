import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task, TaskList, TaskResponse } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => TaskResponse)
  createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @Args('userId') userId: string
  ) {
    return this.taskService.create(userId, createTaskInput);
  }

  @Query(() => TaskList)
  findAllTask() {
    return this.taskService.findAll();
  }

  @Query(() => Task)
  findOneTask(@Args('id', { type: () => String }) id: string) {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => String }) id: string) {
    return this.taskService.remove(id);
  }

  @Mutation(() => TaskResponse)
  removeAllTask() {
    return this.taskService.removeAll();
  }
}
