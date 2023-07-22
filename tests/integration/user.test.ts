/* eslint-disable no-underscore-dangle */
/**
 * Integration tests for the user management API endpoints.
 *
 * @format
 */

import { describe } from 'node:test';
import { req as request, seedDatabase } from '../helpers';

describe('User management API endpoints', () => {
  beforeAll(async () => {
    // Seed the database with test data
    await seedDatabase();
  });

  // Test get all users endpoint
  describe('Get All Users', () => {
    it('should return an array of existing users', async () => {
      const response = await request.get('/api/v1/users');
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(3);
      expect(response.body.data[0]._id).toBe(
        '3618ddc6-3c4c-48b3-9dfd-5242b0fbf897',
      );
      expect(response.body.data[1]._id).toBe(
        'a3cec349-8d87-411e-8430-f3e4e16c8054',
      );
      expect(response.body.data[2]._id).toBe(
        'aea01230-7f6a-4e46-acc8-7643f1ea126e',
      );
    });
  });

  // Test get user by id endpoint
  describe('Get user by id', () => {
    // Test successful get user by id request
    it('should return a specific user', async () => {
      const response = await request.get(
        '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897',
      );
      expect(response.status).toBe(200);
      expect(response.body.data._id).toBe(
        '3618ddc6-3c4c-48b3-9dfd-5242b0fbf897',
      );
      expect(response.body.data.name).toBe('Jang Man Wol');
      expect(response.body.data.email).toBe('jmwl160493@kakaot.com');
    });

    // Test get user by id request with bad request
    it('should return an error message for bad request', async () => {
      const response = await request.get('/api/v1/users/123');
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('userId must be a UUID');
    });

    // Test get user by id request with non-existent user
    it('should return an error message for non-existent user', async () => {
      const response = await request.get(
        '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf898',
      );
      expect(response.status).toBe(404);
      expect(response.body.data.error).toBe(
        "User with id '3618ddc6-3c4c-48b3-9dfd-5242b0fbf898' not found.",
      );
    });
  });

  // Test get user by id endpoint
  describe('Get user by id', () => {
    // Test successful get user by id request
    it('should return a specific user', async () => {
      const response = await request.get(
        '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897',
      );
      expect(response.status).toBe(200);
      expect(response.body.data._id).toBe(
        '3618ddc6-3c4c-48b3-9dfd-5242b0fbf897',
      );
      expect(response.body.data.name).toBe('Jang Man Wol');
      expect(response.body.data.email).toBe('jmwl160493@kakaot.com');
    });

    // Test get user by id request with bad request
    it('should return an error message for bad request', async () => {
      const response = await request.get('/api/v1/users/123');
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('userId must be a UUID');
    });

    // Test get user by id request with non-existent user
    it('should return an error message for non-existent user', async () => {
      const response = await request.get(
        '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf898',
      );
      expect(response.status).toBe(404);
      expect(response.body.data.error).toBe(
        "User with id '3618ddc6-3c4c-48b3-9dfd-5242b0fbf898' not found.",
      );
    });
  });
});
