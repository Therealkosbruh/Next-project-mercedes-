import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly repo: Repository<Car>,
  ) {}

  findAll(): Promise<Car[]> {
    return this.repo.find({ relations: ['modelType', 'colors'] });
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.repo.findOne({
      where: { id },
      relations: ['modelType', 'colors'],
    });
    if (!car) throw new NotFoundException(`Car #${id} not found`);
    return car;
  }

  findByModelType(modelTypeId: number): Promise<Car[]> {
    return this.repo.find({
      where: { modelTypeId },
      relations: ['modelType', 'colors'],
    });
  }
}
