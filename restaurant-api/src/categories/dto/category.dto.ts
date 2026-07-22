import { IsString, IsNotEmpty, Length } from 'class-validator';
export class CategoryDto {

   @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

}