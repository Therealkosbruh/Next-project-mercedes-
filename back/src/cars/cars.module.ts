import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarsController } from './cars.controller';
import { CarsRepository } from './cars.repository';
import { CarsService } from './cars.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarsController],
  providers: [CarsRepository, CarsService],
  exports: [CarsService],
})
export class CarsModule {}
