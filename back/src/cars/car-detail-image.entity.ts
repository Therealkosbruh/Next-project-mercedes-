import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Car } from './car.entity';

@Entity('car_detail_images')
export class CarDetailImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  url!: string;

  @Column({ name: 'sort_order', type: 'smallint', default: 0 })
  sortOrder!: number;

  @ManyToOne(() => Car, (car) => car.detailImages, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car!: Car;

  @Column({ name: 'car_id' })
  carId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
