/**
 * Helper functions for tests
 *
 * @format
 */

import { agent } from 'supertest';
import { Seeder } from 'mongo-seeding';
import path from 'path';
import app from '../index';

const req = agent(app());

async function seedDatabase() {
  // Seed the database with test data
  const config = {
    database: process.env.MONGO_URL_TEST || '',
    dropDatabase: true,
  };

  const seeder = new Seeder(config);
  const collections = seeder.readCollectionsFromPath(
    path.resolve('./tests/data'),
  );

  try {
    await seeder.import(collections);
  } catch (error) {
    console.log(error);
  }
}

export { seedDatabase, req };
