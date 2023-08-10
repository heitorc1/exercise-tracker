import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, createUserSchema } from './dto/create-user.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import {
  CreateExerciseDTO,
  createExerciseSchema,
} from './dto/create-exercise.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  list() {
    return this.userService.list();
  }

  @Post()
  async create(@Body() createUserDto: any) {
    try {
      const data = await createUserSchema.validateAsync(createUserDto.params);
      return this.userService.create(data);
    } catch (err) {
      throw err;
    }
  }

  @Post(':id/exercises')
  @UsePipes(new JoiValidationPipe(createExerciseSchema))
  createExercise(@Param('id') id: string, @Body() body: CreateExerciseDTO) {
    return this.userService.createExercise(id, body);
  }
}
