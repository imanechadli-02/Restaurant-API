import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';

import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}
    @Public()
    @Post('signup')
    signup(
        @Body() createUserDto: CreateUserDto,
    ){
        return this.authService.signup(createUserDto);
    }
    @Public()
    @Post('signin')
    signin(
        @Body() loginDto: LoginDto,
    ){
        return this.authService.signin(loginDto);
    }

}