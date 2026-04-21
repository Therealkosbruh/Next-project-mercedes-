import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CursorQueryDto } from './dto/cursor-query.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Get()
  getPage(@Query() query: CursorQueryDto) {
    return this.service.getPage(query.afterId);
  }

  @Get('by-model-type/:modelTypeId')
  getByModelType(@Param('modelTypeId', ParseIntPipe) modelTypeId: number) {
    return this.service.getByModelType(modelTypeId);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.service.getBySlug(slug);
  }
}
