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
import { CarDetailImage } from './car-detail-image.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'model_number', length: 100 })
  modelNumber!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price!: number;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({
    name: 'short_description',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  shortDescription!: string | null;

  @Column({ type: 'varchar', nullable: true })
  preview!: string | null;

  @Column({ name: 'hover_preview', type: 'varchar', nullable: true })
  hoverPreview!: string | null;

  @Column({ type: 'varchar', nullable: true })
  model!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  slug!: string | null;

  @Column({ type: 'smallint', nullable: true })
  year!: number | null;

  @Column({ name: 'body_type', type: 'varchar', length: 50, nullable: true })
  bodyType!: string | null;

  @Column({ name: 'fuel_type', type: 'varchar', length: 30, nullable: true })
  fuelType!: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  transmission!: string | null;

  @Column({
    name: 'engine_volume',
    type: 'decimal',
    precision: 3,
    scale: 1,
    nullable: true,
  })
  engineVolume!: number | null;

  @Column({ name: 'power_hp', type: 'smallint', nullable: true })
  powerHp!: number | null;

  @Column({ name: 'drive_type', type: 'varchar', length: 10, nullable: true })
  driveType!: string | null;

  @Column({ name: 'is_amg', type: 'boolean', default: false })
  isAmg!: boolean;

  @Column({ name: 'is_electric', type: 'boolean', default: false })
  isElectric!: boolean;

  @Column({ type: 'smallint', nullable: true })
  seats!: number | null;

  @ManyToOne(() => ModelType, (modelType) => modelType.cars, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'model_type_id' })
  modelType!: ModelType;

  @Column({ name: 'model_type_id' })
  modelTypeId!: number;

  @OneToMany(() => Color, (color) => color.car, { cascade: true, eager: true })
  colors!: Color[];

  @OneToMany(() => CarDetailImage, (img) => img.car, {
    cascade: true,
    eager: false,
  })
  detailImages!: CarDetailImage[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
