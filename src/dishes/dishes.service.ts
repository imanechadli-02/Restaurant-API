import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Dishes } from './entities/dishes.entity';
import { CreateDishDto } from './dto/createDishes.dto';
import { Category } from 'src/categories/entities/category.entity';
// import { UpdateDishDto } from './dto/updateDishes.dto';

@Injectable()
export class DishesService {
  constructor(
  @InjectRepository(Dishes)
  private readonly repository: Repository<Dishes>,

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>,
) {}

  async create(createDishDto: CreateDishDto): Promise<Dishes> {

  const category = await this.categoryRepository.findOne({
    where: {
      id: createDishDto.categoryId,
    },
  });

  if (!category) {
    throw new NotFoundException('Category not found');
  }

  const dish = this.repository.create({
    name: createDishDto.name,
    description: createDishDto.description,
    price: createDishDto.price,
    category: category,
  });

  return await this.repository.save(dish);
}

  async findAll(): Promise<Dishes[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Dishes> {
    const dish = await this.repository.findOne({
      where: { id },
    });

    if (!dish) {
      throw new NotFoundException(
        `Dish with id ${id} not found`,
      );
    }

    return dish;
  }

  async update(
    id: number,
    updateDishDto: CreateDishDto,
  ): Promise<Dishes> {
    const dish = await this.findOne(id);

    Object.assign(dish, updateDishDto);

    return await this.repository.save(dish);
  }

  async remove(id: number): Promise<void> {
    const dish = await this.findOne(id);

    await this.repository.remove(dish);
  }
}