import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../categories/entities/category.entity";

@Entity('Dishes')
export class Dishes{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
      name!: string;
    
    @Column()
      description!: string;

    @Column()
    price!: number;


     @ManyToOne(
      () => Category,
      category => category.dishes,
      {
          nullable:false,
          onDelete:'CASCADE',
      }
  )
  category!: Category;
    

}