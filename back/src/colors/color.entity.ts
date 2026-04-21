import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Car } from '../cars/car.entity';

@Entity('colors')
export class Color {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 7 })
  hex!: string;

  @ManyToOne(() => Car, (car) => car.colors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'car_id' })
  car!: Car;

  @Column({ name: 'car_id' })
  carId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
