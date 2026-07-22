import { Dishes } from '../../dishes/entities/dishes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true})
  name!: string;

  @Column()
  description!: string;

  @OneToMany(
    () => Dishes,
    dish => dish.category,
  )
  dishes!: Dishes[];

}