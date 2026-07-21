import { IsString, IsNotEmpty, Length } from 'class-validator';
export class CreateCategoryDto {

   @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

}