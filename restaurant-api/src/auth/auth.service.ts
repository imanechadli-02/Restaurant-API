import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

import { CreateUserDto } from '../users/dto/create-user.dto';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    // Préparer les données à enregistrer
    const userData = {
      email: createUserDto.email,
      password: hashedPassword,
    };

    // Enregistrer l'utilisateur
    const user = await this.usersService.create(userData);

    // Créer le payload du JWT
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Générer le token
    const accessToken = await this.jwtService.signAsync(payload);

    // Retourner le token
    return {
      access_token: accessToken,
    };
  }

  async signin(loginDto: LoginDto) {
    // Chercher l'utilisateur
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Comparer les mots de passe
    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Créer le payload
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Générer le JWT
    const accessToken = await this.jwtService.signAsync(payload);

    // Retourner le token
    return {
      access_token: accessToken,
    };
  }
}