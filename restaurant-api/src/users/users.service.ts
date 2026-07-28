import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.repository.create(createUserDto);
        return await this.repository.save(newUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({
            where: { email },
        });
    }

    async findById(id: number): Promise<User | null> {
        return await this.repository.findOne({
            where: { id },
        });
    }
}
