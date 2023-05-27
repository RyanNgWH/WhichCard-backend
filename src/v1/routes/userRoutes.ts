/**
 * Routes for user management
 *
 * @format
 */

import express from 'express';

const router = express.Router();

/**
 * Base url methods
 */
router
  .route('/')
  /**
   * Get all Users
   * GET /api/v1/users
   */
  .get((req, res) => {
    res.send('Get all users');
  })
  /**
   * Create a new User
   * POST /api/v1/users
   */
  .post((req, res) => {
    res.send('Create a user');
  });

/**
 * User id methods
 */
router
  .route('/:userId')
  /**
   * Get a User by id
   * GET /api/v1/users/:userId
   */
  .get((req, res) => {
    res.send(`Get an existing user with ID:${req.params.userId}`);
  })
  /**
   * Update a User by id
   * PATCH /api/v1/users/:userId
   */
  .patch((req, res) => {
    res.send(`Update an existing user with ID:${req.params.userId}`);
  })
  /**
   * Delete a User by id
   */
  .delete((req, res) => {
    res.send(`Delete an existing user with ID:${req.params.userId}`);
  });

export default router;
