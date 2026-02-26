import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ModelTypesService } from './model-types.service';

@Controller('model-types')
export class ModelTypesController {
  constructor(private readonly service: ModelTypesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}
