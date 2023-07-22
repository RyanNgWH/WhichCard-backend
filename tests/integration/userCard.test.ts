/* eslint-disable no-underscore-dangle */
/**
 * Integration tests for the user card management API endpoints.
 *
 * @format
 */

import { describe } from 'node:test';
import { req as request, seedDatabase } from '../helpers';

describe('User wallet (Cards) management API endpoints', () => {
  beforeAll(async () => {
    // Seed the database with test data
    await seedDatabase();
  });

  // Test get all user cards endpoint
  describe('Get all user cards', () => {
    it('should return an array of existing user cards', async () => {
      const response = await request.get(
        '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897/cards',
      );
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
      expect(response.body.data[0].cardName).toBe('My lovely ocbc');
      expect(response.body.data[1].cardName).toBe('My second ocbc');
    });

    // Test bad request
    it('should return an error message for bad request', async () => {
      const response = await request.get(
        '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf89s/cards',
      );
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('userId must be a UUID');
    });

    // Test with non-existent user
    it('should return an error message for non-existent user', async () => {
      const response = await request.get(
        '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf898/cards',
      );
      expect(response.status).toBe(404);
      expect(response.body.data.error).toBe(
        "User with id '3618ddc6-3c4c-48b3-9dfd-5242b0fbf898' not found.",
      );
    });
  });

  // Test add user card endpoint
  describe("Add card to user's wallet", () => {
    // Test successful request
    it('should return the user with the added card', async () => {
      const response = await request
        .post('/api/v1/users/a3cec349-8d87-411e-8430-f3e4e16c8054/cards')
        .send({
          cardName: 'Yay OCBC',
          cardExpiry: '2028-01-01',
          issuer: 'OCBC',
          type: '365 credit',
        });
      expect(response.status).toBe(200);
      expect(response.body.data.cards.length).toBe(1);
      expect(response.body.data.cards[0].cardName).toBe('Yay OCBC');
      expect(response.body.data.cards[0].card).toBe(
        'dba21fa7-ec07-47d0-9e14-66afe3157829',
      );
    });

    // Test with bad request
    it('should return an error message for bad request', async () => {
      const response = await request
        .post('/api/v1/users/a3cec349-8d87-411e-8430-f3e4e16c8054/cards')
        .send({
          cardName: 'Yay OCBC @',
          cardExpiry: '2028-01-012',
          issuer: 'OCBC',
          type: '365 credit',
        });
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe(
        'Card name must be alphanumeric, spaces and dashes allowed',
      );
      expect(response.body.errors[1].msg).toBe(
        'Card expiry must be a valid date in YYYY-MM-DD format',
      );
    });

    // Test with non-existent user
    it('should return an error message for non-existent user', async () => {
      const response = await request
        .post('/api/v1/users/a3cec349-8d87-411e-8430-f3e4e16c8055/cards')
        .send({
          cardName: 'Yay OCBC',
          cardExpiry: '2028-01-01',
          issuer: 'OCBC',
          type: '365 credit',
        });
      expect(response.status).toBe(404);
      expect(response.body.data.error).toBe(
        "User with id 'a3cec349-8d87-411e-8430-f3e4e16c8055' not found.",
      );
    });

    // Test with duplicate card
    it("should return an error message for duplicate card in user's wallet", async () => {
      const response = await request
        .post('/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897/cards')
        .send({
          cardName: 'My lovely ocbc',
          cardExpiry: '2028-01-01',
          issuer: 'OCBC',
          type: '365 credit',
        });
      expect(response.status).toBe(422);
      expect(response.body.data.error).toBe(
        "Card with name 'My lovely ocbc' already exists in user's cards.",
      );
    });

    // Test with invalid issuer and type combination
    it('should return an error message for invalid issuer and type combination', async () => {
      const response = await request
        .post('/api/v1/users/a3cec349-8d87-411e-8430-f3e4e16c8054/cards')
        .send({
          cardName: 'Yay OCBC',
          cardExpiry: '2028-01-01',
          issuer: 'DBS',
          type: '365 credit',
        });
      expect(response.status).toBe(422);
      expect(response.body.data.error).toBe(
        "Card with type '365 credit' and issuer 'dbs' not found.",
      );
    });
  });

  // Test get user card by name endpoint
  describe('Get user card by name', () => {
    it('should return an existing user card', async () => {
      const response = await request.get(
        '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897/cards/My lovely ocbc',
      );
      expect(response.status).toBe(200);
      expect(response.body.data.cardName).toBe('My lovely ocbc');
      expect(response.body.data.card._id).toBe(
        'dba21fa7-ec07-47d0-9e14-66afe3157829',
      );
    });

    // Test bad request
    it('should return an error message for bad request', async () => {
      const response = await request.get(
        '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf89s/cards/My lovely ocbc @',
      );
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('userId must be a UUID');
      expect(response.body.errors[1].msg).toBe(
        'Card name must be alphanumeric, spaces and dashes allowed',
      );
    });

    // Test with non-existent user
    it('should return an error message for non-existent user', async () => {
      const response = await request.get(
        '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf898/cards/My lovely ocbc',
      );
      expect(response.status).toBe(404);
      expect(response.body.data.error).toBe(
        "User with id '3618ddc6-3c4c-48b3-9dfd-5242b0fbf898' not found.",
      );
    });

    // Test with non-existent user card
    it('should return an error message for non-existent user', async () => {
      const response = await request.get(
        '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897/cards/My sweet ocbc',
      );
      expect(response.status).toBe(404);
      expect(response.body.data.error).toBe(
        "User with id '3618ddc6-3c4c-48b3-9dfd-5242b0fbf897' has no card with name 'My sweet ocbc'.",
      );
    });
  });

  // Test update user card by name endpoint
  describe("Update user's card by name", () => {
    // Test successful request
    it('should return the updated user card', async () => {
      const response = await request
        .patch(
          '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897/cards/my second ocbc',
        )
        .send({
          cardExpiry: '2029-10-02',
        });
      expect(response.status).toBe(200);
      expect(response.body.data.cardExpiry).toBe('2029-10-02T00:00:00.000Z');
    });

    // Test invalid request
    it('should return an error message for bad request', async () => {
      const response = await request
        .patch(
          '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897/cards/my second ocbc',
        )
        .send({
          issuer: 'ocbc',
        });
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe(
        'If updating type or issuer, both must be provided',
      );
    });

    // Test with non-existent user
    it('should return an error message for non-existent user', async () => {
      const response = await request
        .patch(
          '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf898/cards/my second ocbc',
        )
        .send({
          cardExpiry: '2029-10-02',
        });
      expect(response.status).toBe(404);
      expect(response.body.data.error).toBe(
        "User with id '3618ddc6-3c4c-48b3-9dfd-5242b0fbf898' not found.",
      );
    });

    // Test with non-existent card
    it('should return an error message for non-existent user', async () => {
      const response = await request
        .patch(
          '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897/cards/my ocbc',
        )
        .send({
          cardExpiry: '2029-10-02',
        });
      expect(response.status).toBe(404);
      expect(response.body.data.error).toBe(
        "User with id '3618ddc6-3c4c-48b3-9dfd-5242b0fbf897' has no card with name 'my ocbc'.",
      );
    });

    // Test with duplicate card name
    it("should return an error message for duplicate card name in user's wallet", async () => {
      const response = await request
        .patch(
          '/api/v1/users/3618ddc6-3c4c-48b3-9dfd-5242b0fbf897/cards/my lovely ocbc',
        )
        .send({
          cardName: 'My second ocbc',
        });
      expect(response.status).toBe(422);
      expect(response.body.data.error).toBe(
        "User with id '3618ddc6-3c4c-48b3-9dfd-5242b0fbf897' already has a card with name 'My second ocbc'.",
      );
    });
  });

  // Test delete user card by name endpoint
  describe('Delete user card by name', () => {
    // Test successful request
    it('should return an empty response', async () => {
      const response = await request.delete(
        '/api/v1/users/aea01230-7f6a-4e46-acc8-7643f1ea126e/cards/Sanchez ocbc',
      );
      expect(response.status).toBe(204);
      expect(response.body).toStrictEqual({});
    });

    // Test invalid request
    it('should return an error message for bad request', async () => {
      const response = await request.delete(
        '/api/v1/users/aea01230-7f6a-4e46-acc8-7643f1ea126e/cards/Sanchez ocbc@',
      );
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe(
        'Card name must be alphanumeric, spaces and dashes allowed',
      );
    });

    // TODO: Fix this test
    // // Test with non-existent user
    // it('should return an error message for non-existent user', async () => {
    //   const response = await request.delete(
    //     '/api/v1/users/71833fdb-2b31-4d1c-8d00-1c39d8d78b33/cards/Sanchez ocbc',
    //   );
    //   expect(response.status).toBe(404);
    //   expect(response.body.data.error).toBe(
    //     "User with id '71833fdb-2b31-4d1c-8d00-1c39d8d78b33' not found.",
    //   );
    // });
  });
});
