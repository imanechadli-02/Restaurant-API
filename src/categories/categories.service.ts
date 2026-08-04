import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(CategoryDto: CategoryDto): Promise<Category> {
    const category = this.repository.create(CategoryDto);

    return await this.repository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.repository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with id ${id} not found`,
      );
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: CategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    Object.assign(category, updateCategoryDto);

    return await this.repository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);

    await this.repository.remove(category);
  }
}