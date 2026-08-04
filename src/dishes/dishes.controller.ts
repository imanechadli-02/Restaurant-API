import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/createDishes.dto';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { UpdateDishDto } from './dto/updateDishes.dto';

@Controller('dishes')
export class DishesController {

  constructor(
    private readonly dishesService: DishesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  @Roles(Role.ADMIN)
  create(
    @Body() createDishDto: CreateDishDto,
  ) {
    return this.dishesService.create(createDishDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard) 
  findAll() {
    return this.dishesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) 
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.dishesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) 
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDishDto: CreateDishDto,
  ) {
    return this.dishesService.update(id, updateDishDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) 
  @Roles(Role.ADMIN)
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.dishesService.remove(id);
  }

}