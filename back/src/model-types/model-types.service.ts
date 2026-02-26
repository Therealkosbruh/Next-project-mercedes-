import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelType } from './model-type.entity';

@Injectable()
export class ModelTypesService {
  constructor(
    @InjectRepository(ModelType)
    private readonly repo: Repository<ModelType>,
  ) {}

  findAll(): Promise<ModelType[]> {
    return this.repo.find({ relations: ['cars'] });
  }

  async findOne(id: number): Promise<ModelType> {
    const modelType = await this.repo.findOne({
      where: { id },
      relations: ['cars'],
    });
    if (!modelType) throw new NotFoundException(`ModelType #${id} not found`);
    return modelType;
  }
}
