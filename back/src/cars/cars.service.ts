import { Injectable, NotFoundException } from '@nestjs/common';
import { CarsRepository } from './cars.repository';
import { CarDetailDto } from './dto/car-detail.dto';
import { CarListItemDto } from './dto/car-list-item.dto';
import { CarsPageDto } from './dto/cars-page.dto';

const PAGE_SIZE = 9;

@Injectable()
export class CarsService {
  constructor(private readonly repo: CarsRepository) {}

  async getPage(afterId = 0): Promise<CarsPageDto> {
    const [rows, total] = await Promise.all([
      this.repo.findPage(afterId, PAGE_SIZE + 1),
      this.repo.count(),
    ]);

    const hasMore = rows.length > PAGE_SIZE;
    const items = rows.slice(0, PAGE_SIZE).map(CarListItemDto.from);

    return {
      items,
      hasMore,
      nextCursor: hasMore ? items[items.length - 1].id : null,
      total,
    };
  }

  async getBySlug(slug: string): Promise<CarDetailDto> {
    const car = await this.repo.findBySlug(slug);
    if (!car) throw new NotFoundException(`Car "${slug}" not found`);
    return CarDetailDto.from(car);
  }

  async getByModelType(modelTypeId: number): Promise<CarListItemDto[]> {
    const cars = await this.repo.findByModelType(modelTypeId);
    return cars.map(CarListItemDto.from);
  }
}
