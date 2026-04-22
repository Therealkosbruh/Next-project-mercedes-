import { Car } from '../car.entity';

class ModelTypeRef {
  id: number;
  name: string;
}

class ColorRef {
  name: string;
  hex: string;
}

export class CarListItemDto {
  id: number;
  slug: string | null;
  modelNumber: string;
  price: number;
  shortDescription: string | null;
  preview: string | null;
  hoverPreview: string | null;
  year: number | null;
  bodyType: string | null;
  fuelType: string | null;
  powerHp: number | null;
  driveType: string | null;
  isAmg: boolean;
  isElectric: boolean;
  seats: number | null;
  modelType: ModelTypeRef;
  colors: ColorRef[];

  static from(car: Car): CarListItemDto {
    const d = new CarListItemDto();
    d.id = car.id;
    d.slug = car.slug;
    d.modelNumber = car.modelNumber;
    d.price = Number(car.price);
    d.shortDescription = car.shortDescription;
    d.preview = car.preview;
    d.hoverPreview = car.hoverPreview;
    d.year = car.year;
    d.bodyType = car.bodyType;
    d.fuelType = car.fuelType;
    d.powerHp = car.powerHp;
    d.driveType = car.driveType;
    d.isAmg = car.isAmg;
    d.isElectric = car.isElectric;
    d.seats = car.seats;
    d.modelType = { id: car.modelType.id, name: car.modelType.name };
    d.colors = car.colors.map((c) => ({ name: c.name, hex: c.hex }));
    return d;
  }
}
