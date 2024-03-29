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
      expect(response.body.data.length).toBe(4);
      expect(response.body.data[0]._id).toBe(
        '3618ddc6-3c4c-48b3-9dfd-5242b0fbf897',
      );
      expect(response.body.data[1]._id).toBe(
        'a3cec349-8d87-411e-8430-f3e4e16c8054',
      );
      expect(response.body.data[2]._id).toBe(
        'aea01230-7f6a-4e46-acc8-7643f1ea126e',
      );
      expect(response.body.data[3]._id).toBe(
        '71833fdb-2b31-4d1c-8d00-1c39d8d78b32',
      );
    });
  });

  // Test get user by id endpoint
  describe('Get user by id', () => {
    // Test successful request
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

    // Test bad request
    it('should return an error message for bad request', async () => {
      const response = await request.get('/api/v1/users/123');
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('userId must be a UUID');
    });

    // Test with non-existent user
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

  // Test create user endpoint
  describe('Create user', () => {
    // Test successful request
    it('should return the newly created user', async () => {
      const response = await request.post('/api/v1/users').send({
        name: 'Tiny Luna',
        email: 'luna@tinynamoo.com',
        password: 'P@ssw0rd',
      });
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe('Tiny Luna');
      expect(response.body.data.email).toBe('luna@tinynamoo.com');
    });

    // Test with bad request
    it('should return an error message for bad request', async () => {
      const response = await request.post('/api/v1/users').send({
        name: 'Tiny Luna',
        email: 'luna@tinynamoo.com',
        password: 'simplePassword',
      });
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe(
        'Password does not meet requirements',
      );
    });

    // Test with duplicate user
    it('should return an error message for duplicate user', async () => {
      const response = await request.post('/api/v1/users').send({
        name: 'Duplicate User',
        email: 'kimsun@goblinchiken.com',
        password: 'P@ssw0rd',
      });
      expect(response.status).toBe(422);
      expect(response.body.data.error).toBe(
        "User with email 'kimsun@goblinchiken.com' already exists.",
      );
    });
  });

  // Test update user by id endpoint
  describe('Update user by id', () => {
    // Test successful request
    it('should return the updated user', async () => {
      const response = await request
        .patch('/api/v1/users/aea01230-7f6a-4e46-acc8-7643f1ea126e')
        .send({
          name: 'Tiny Luna',
          password: 'P@ssw0rd',
        });
      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('Tiny Luna');
      expect(response.body.data.password).toBe(
        'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342',
      );
    });

    // Test invalid request
    it('should return an error message for bad request', async () => {
      const response = await request
        .patch('/api/v1/users/aea01230-7f6a-4e46-acc8-7643f1ea126e')
        .send({
          name: 'Tiny Luna',
          password: 'simplePassword',
        });
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe(
        'Password does not meet requirements',
      );
    });

    // Test with non-existent user
    it('should return an error message for non-existent user', async () => {
      const response = await request
        .patch('/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf898')
        .send({
          name: 'Tiny Luna',
          password: 'P@ssw0rd',
        });
      expect(response.status).toBe(404);
      expect(response.body.data.error).toBe(
        "User with id '3618ddc6-3c4c-48b3-9dfd-5242b0fbf898' not found.",
      );
    });

    // TODO: Fix this test
    // Test with duplicate user
    // it('should return an error message for duplicate user', async () => {
    //   const response = await request.post('/api/v1/users').send({
    //     email: 'kimsun@goblinchiken.com',
    //     password: 'P@ssw0rd',
    //   });
    //   expect(response.status).toBe(422);
    //   expect(response.body.data.error).toBe(
    //     "User with email 'kimsun@goblinchiken.com' already exists.",
    //   );
    // });
  });

  // Test delete user by id endpoint
  describe('Delete user by id', () => {
    // Test successful request
    it('should return an empty response', async () => {
      const response = await request.delete(
        '/api/v1/users/71833fdb-2b31-4d1c-8d00-1c39d8d78b32',
      );
      expect(response.status).toBe(204);
      expect(response.body).toStrictEqual({});
    });

    // Test invalid request
    it('should return an error message for bad request', async () => {
      const response = await request.delete(
        '/api/v1/users/71833fdb-2b31-4d1c-8d00-1c39d8d78b3s',
      );
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('userId must be a UUID');
    });
  });

  // Test login endpoint
  describe('Login', () => {
    // Test successful request
    it('should return the user to login', async () => {
      const response = await request.post('/api/v1/users/login').send({
        email: 'jmwl160493@kakaot.com',
        password: 'P@ssw0rd',
      });
      expect(response.status).toBe(200);
      expect(response.body.data._id).toBe(
        '3618ddc6-3c4c-48b3-9dfd-5242b0fbf897',
      );
    });

    // Test invalid request
    it('should return an error message for bad request', async () => {
      const response = await request.post('/api/v1/users/login').send({
        email: 'jmwl160493@',
        password: 'P@ssw0rd',
      });
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('Email is invalid');
    });

    // Test invalid credentials
    it('should return an error message for invalid credentials', async () => {
      const response = await request.post('/api/v1/users/login').send({
        email: 'jmwl160493@kakaot.com',
        password: 'wrongPassword',
      });
      expect(response.status).toBe(401);
      expect(response.body.data.error).toBe('Incorrect credentials.');
    });
  });

  // Test recommend card endpoint
  describe('Recommend card to user', () => {
    // Test successful request
    it('should return the recommended card', async () => {
      const response = await request
        .post('/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897/recommend')
        .send({
          merchant: 'f6c42c4a-e63e-434a-8dca-a99d2aff7bc4',
          amount: '20',
        });
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
      expect(response.body.data[0].cardName).toBe('My second ocbc');
      expect(response.body.data[0].cashbackAmount).toBe(1.2);
      expect(response.body.data[1].cardName).toBe('My lovely ocbc');
      expect(response.body.data[1].cashbackAmount).toBe(1.2);
    });

    // TODO: Fix this test
    // // Test successful request
    // it('should return the recommended card (with exceeded cashback)', async () => {
    //   const response = await request
    //     .post('/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897/recommend')
    //     .send({
    //       merchant: 'f6c42c4a-e63e-434a-8dca-a99d2aff7bc4',
    //       amount: '2000',
    //     });
    //   expect(response.status).toBe(200);
    //   expect(response.body.data.length).toBe(2);
    //   expect(response.body.data[0].cardName).toBe('My second ocbc');
    //   expect(response.body.data[0].cashbackAmount).toBe(80);
    //   expect(response.body.data[1].cardName).toBe('My lovely ocbc');
    //   expect(response.body.data[1].cashbackAmount).toBe(20);
    // });

    // TODO: Add remaining tests for this endpoint
  });
});
