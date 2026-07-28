import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { DishesModule } from './dishes/dishes.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';

// import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';

import { APP_INTERCEPTOR } from '@nestjs/core';

import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'mysql',

        host: configService.get<string>('DB_HOST'),

        port: configService.get<number>('DB_PORT'),

        username: configService.get<string>('DB_USERNAME'),

        password: configService.get<string>('DB_PASSWORD'),

        database: configService.get<string>('DB_NAME'),

        autoLoadEntities: true,

        synchronize: false,
      }),
    }),

    CategoriesModule,

    DishesModule,

    UsersModule,

    AuthModule,
  ],

  controllers: [AppController, UsersController],

  providers: [AppService,
     {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },

  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
  ],
})
export class AppModule {}