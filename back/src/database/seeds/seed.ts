import { AppDataSource } from '../data-source';
import { ModelType } from '../../model-types/model-type.entity';
import { Car } from '../../cars/car.entity';
import { Color } from '../../colors/color.entity';
import { CarDetailImage } from '../../cars/car-detail-image.entity';
import { CAR_DATA, COLORS_PALETTE, MODEL_TYPES, DETAIL_IMAGES } from './constants';

const COLORS_PER_CAR: Record<string, string[]> = {
  'GLE 450 4MATIC':                    ['Obsidian Black', 'Polar White', 'Iridium Silver', 'Cavansite Blue'],
  'GLE 63 S AMG 4MATIC+':             ['Obsidian Black', 'Polar White', 'Graphite Grey', 'Patagonia Red'],
  'GLS 450 4MATIC':                    ['Obsidian Black', 'Polar White', 'Iridium Silver', 'Mojave Silver', 'Cavansite Blue'],
  'GLS 600 Maybach':                   ['Obsidian Black', 'Polar White', 'Mojave Silver', 'Designo Manufaktur Maybach Gold'],
  'S 500 4MATIC':                      ['Obsidian Black', 'Polar White', 'Iridium Silver', 'Cavansite Blue', 'Emerald Green'],
  'S 63 AMG 4MATIC+ E Performance':    ['Obsidian Black', 'Polar White', 'Graphite Grey', 'Patagonia Red'],
  'S 680 Maybach 4MATIC':              ['Obsidian Black', 'Polar White', 'Mojave Silver', 'Designo Manufaktur Maybach Gold'],
  'E 300':                             ['Obsidian Black', 'Polar White', 'Iridium Silver', 'Cavansite Blue'],
  'E 53 AMG 4MATIC+':                  ['Obsidian Black', 'Polar White', 'Graphite Grey', 'Patagonia Red'],
  'C 300':                             ['Obsidian Black', 'Polar White', 'Iridium Silver', 'Brilliant Blue', 'Patagonia Red'],
  'C 43 AMG 4MATIC':                   ['Obsidian Black', 'Polar White', 'Graphite Grey', 'Patagonia Red'],
  'A 200':                             ['Obsidian Black', 'Polar White', 'Iridium Silver', 'Cavansite Blue', 'Patagonia Red'],
  'CLA 250 4MATIC':                    ['Obsidian Black', 'Polar White', 'Iridium Silver', 'Brilliant Blue'],
  'CLS 450 4MATIC':                    ['Obsidian Black', 'Polar White', 'Graphite Grey', 'Cavansite Blue'],
  'G 500':                             ['Obsidian Black', 'Polar White', 'Iridium Silver', 'Emerald Green'],
  'G 63 AMG':                          ['Obsidian Black', 'Polar White', 'Graphite Grey', 'Patagonia Red', 'Designo Manufaktur Maybach Gold'],
  'EQS 450+':                          ['Obsidian Black', 'Polar White', 'Iridium Silver', 'Cavansite Blue', 'Emerald Green'],
  'EQE 350+':                          ['Obsidian Black', 'Polar White', 'Iridium Silver', 'Cavansite Blue'],
};

async function seed() {
  await AppDataSource.initialize();
  console.log('Connected to database');

  const modelTypeRepo = AppDataSource.getRepository(ModelType);
  const carRepo = AppDataSource.getRepository(Car);
  const colorRepo = AppDataSource.getRepository(Color);
  const detailImageRepo = AppDataSource.getRepository(CarDetailImage);

  await AppDataSource.query(
    'TRUNCATE TABLE car_detail_images, colors, cars, model_types RESTART IDENTITY CASCADE',
  );
  console.log('Cleared existing data');

  const savedModelTypes = await modelTypeRepo.save(
    MODEL_TYPES.map((mt) => modelTypeRepo.create(mt)),
  );
  console.log(`Created ${savedModelTypes.length} model types`);

  const modelTypeMap = new Map(savedModelTypes.map((mt) => [mt.name, mt.id]));
  const colorMap = new Map<string, string>(COLORS_PALETTE.map((c) => [c.name, c.hex]));

  const carsToSave = CAR_DATA.map((data) => {
    const { modelTypeName, ...fields } = data;
    return carRepo.create({
      ...fields,
      modelTypeId: modelTypeMap.get(modelTypeName)!,
    });
  });

  const savedCars = await carRepo.save(carsToSave);
  console.log(`Created ${savedCars.length} cars`);

  const colorsToSave: Color[] = [];
  for (const car of savedCars) {
    const colorNames = COLORS_PER_CAR[car.modelNumber] ?? [];
    for (const name of colorNames) {
      const hex = colorMap.get(name);
      if (hex) {
        colorsToSave.push(colorRepo.create({ name, hex, carId: car.id }));
      }
    }
  }
  await colorRepo.save(colorsToSave);
  console.log(`Created ${colorsToSave.length} colors`);

  const detailImagesToSave: CarDetailImage[] = [];
  for (const car of savedCars) {
    DETAIL_IMAGES.forEach((url, index) => {
      detailImagesToSave.push(
        detailImageRepo.create({ url, sortOrder: index, carId: car.id }),
      );
    });
  }
  await detailImageRepo.save(detailImagesToSave);
  console.log(`Created ${detailImagesToSave.length} detail images`);

  await AppDataSource.destroy();
  console.log('Seed complete!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
