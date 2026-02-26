import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelType } from './model-type.entity';
import { ModelTypesController } from './model-types.controller';
import { ModelTypesService } from './model-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModelType])],
  controllers: [ModelTypesController],
  providers: [ModelTypesService],
  exports: [ModelTypesService],
})
export class ModelTypesModule {}
