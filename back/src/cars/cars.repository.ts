import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Car } from './car.entity';

const RELATIONS = ['modelType', 'colors'] as const;
const DETAIL_RELATIONS = ['modelType', 'colors', 'detailImages'] as const;

@Injectable()
export class CarsRepository {
  constructor(
    @InjectRepository(Car)
    private readonly orm: Repository<Car>,
  ) {}

  findPage(afterId: number, limit: number): Promise<Car[]> {
    return this.orm.find({
      where: afterId > 0 ? { id: MoreThan(afterId) } : {},
      relations: [...RELATIONS],
      order: { id: 'ASC' },
      take: limit,
    });
  }

  findBySlug(slug: string): Promise<Car | null> {
    return this.orm.findOne({
      where: { slug },
      relations: [...DETAIL_RELATIONS],
      order: { detailImages: { sortOrder: 'ASC' } },
    });
  }

  findByModelType(modelTypeId: number): Promise<Car[]> {
    return this.orm.find({
      where: { modelTypeId },
      relations: [...RELATIONS],
      order: { id: 'ASC' },
    });
  }

  count(): Promise<number> {
    return this.orm.count();
  }
}
