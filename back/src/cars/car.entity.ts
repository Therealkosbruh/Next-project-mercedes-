import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ModelType } from '../model-types/model-type.entity';
import { Color } from '../colors/color.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'model_number', length: 100 })
  modelNumber: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  preview: string | null;

  @Column({ type: 'varchar', nullable: true })
  model: string | null;

  @ManyToOne(() => ModelType, (modelType) => modelType.cars, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'model_type_id' })
  modelType: ModelType;

  @Column({ name: 'model_type_id' })
  modelTypeId: number;

  @OneToMany(() => Color, (color) => color.car, { cascade: true, eager: true })
  colors: Color[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
