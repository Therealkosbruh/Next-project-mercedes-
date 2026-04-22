import { Car } from '../car.entity';
import { CarListItemDto } from './car-list-item.dto';

export class CarDetailDto extends CarListItemDto {
  description: string | null;
  engineVolume: number | null;
  transmission: string | null;
  model: string | null;
  detailImages: string[];

  static from(car: Car): CarDetailDto {
    const d = Object.assign(new CarDetailDto(), CarListItemDto.from(car));
    d.description = car.description;
    d.engineVolume = car.engineVolume !== null ? Number(car.engineVolume) : null;
    d.transmission = car.transmission;
    d.model = car.model;
    d.detailImages = (car.detailImages ?? [])
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((img) => img.url);
    return d;
  }
}
