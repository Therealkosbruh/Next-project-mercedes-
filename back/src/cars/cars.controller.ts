import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Get('by-model-type/:modelTypeId')
  findByModelType(@Param('modelTypeId', ParseIntPipe) modelTypeId: number) {
    return this.service.findByModelType(modelTypeId);
  }
}
