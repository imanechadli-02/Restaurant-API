import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';

import { Dishes } from './entities/dishes.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Dishes,
      Category,
    ]),
  ],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}