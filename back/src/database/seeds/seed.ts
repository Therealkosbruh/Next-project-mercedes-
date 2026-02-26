import { AppDataSource } from '../data-source';
import { ModelType } from '../../model-types/model-type.entity';
import { Car } from '../../cars/car.entity';
import { Color } from '../../colors/color.entity';
import { faker } from '@faker-js/faker';
import { COLORS_PALETTE, MODEL_NUMBERS, MODEL_TYPES } from './constants';

async function seed() {
  await AppDataSource.initialize();
  console.log('Connected to database');

  const modelTypeRepo = AppDataSource.getRepository(ModelType);
  const carRepo = AppDataSource.getRepository(Car);
  const colorRepo = AppDataSource.getRepository(Color);

  await AppDataSource.query(
    'TRUNCATE TABLE colors, cars, model_types RESTART IDENTITY CASCADE',
  );
  console.log('Cleared existing data');

  const savedModelTypes = await modelTypeRepo.save(
    MODEL_TYPES.map((mt) => modelTypeRepo.create(mt)),
  );
  console.log(`Created ${savedModelTypes.length} model types`);

  const cars: Car[] = [];
  for (const modelType of savedModelTypes) {
    const count = faker.number.int({ min: 2, max: 4 });
    for (let i = 0; i < count; i++) {
      const year = faker.number.int({ min: 2022, max: 2025 });
      const car = carRepo.create({
        modelNumber: `${faker.helpers.arrayElement(MODEL_NUMBERS[modelType.name])} ${year}`,
        price: Number(faker.commerce.price({ min: 60000, max: 350000, dec: 2 })),
        description: faker.lorem.sentences(2),
        preview: `/images/cars/${modelType.name.toLowerCase().replace(/\s/g, '-')}-preview.jpg`,
        model: `/models/${modelType.name.toLowerCase().replace(/\s/g, '-')}.glb`,
        modelTypeId: modelType.id,
      });
      cars.push(car);
    }
  }
  const savedCars = await carRepo.save(cars);
  console.log(`Created ${savedCars.length} cars`);

  const colorsToSave: Color[] = [];
  for (const car of savedCars) {
    const count = faker.number.int({ min: 3, max: 6 });
    const picked = faker.helpers.arrayElements([...COLORS_PALETTE], count);
    for (const c of picked) {
      colorsToSave.push(colorRepo.create({ ...c, carId: car.id }));
    }
  }
  await colorRepo.save(colorsToSave);
  console.log(`Created ${colorsToSave.length} colors`);

  await AppDataSource.destroy();
  console.log('Seed complete!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
