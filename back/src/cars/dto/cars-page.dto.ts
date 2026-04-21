import { CarListItemDto } from './car-list-item.dto';

export class CarsPageDto {
  items: CarListItemDto[];
  nextCursor: number | null;
  hasMore: boolean;
  total: number;
}
