import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/createDishes.dto';
// import { UpdateDishDto } from './dto/updateDishes.dto';

@Controller('dishes')
export class DishesController {

  constructor(
    private readonly dishesService: DishesService,
  ) {}

  @Post()
  create(
    @Body() createDishDto: CreateDishDto,
  ) {
    return this.dishesService.create(createDishDto);
  }

  @Get()
  findAll() {
    return this.dishesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.dishesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDishDto: CreateDishDto,
  ) {
    return this.dishesService.update(id, updateDishDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.dishesService.remove(id);
  }

}