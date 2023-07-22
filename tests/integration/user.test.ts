/* eslint-disable no-underscore-dangle */
/**
 * Integration tests for the user management API endpoints.
 *
 * @format
 */

import { Seeder } from 'mongo-seeding';
import path from 'path';
import { describe } from 'node:test';
import request from '../helpers';

// Seed the database with test data
const config = {
  database: process.env.MONGO_URL_TEST || '',
  dropDatabase: true,
};

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve('./data'));

try {
  await seeder.import(collections);
} catch (error) {
  console.log(error);
}

describe('User management API endpoints', () => {
  // Test get all users endpoint
  describe('Get All Users', () => {
    it('should return an array of existing users', async () => {
      const response = await request.get('/api/v1/users');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body[0]._id).toBe('3618ddc6-3c4c-48b3-9dfd-5242b0fbf897');
      expect(response.body[1]._id).toBe('a3cec349-8d87-411e-8430-f3e4e16c8054');
      expect(response.body[2]._id).toBe('aea01230-7f6a-4e46-acc8-7643f1ea126e');
    });
  });
});
