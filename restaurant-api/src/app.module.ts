import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [CategoriesModule,  ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
