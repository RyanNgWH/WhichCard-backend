/**
 * Routes for user management
 *
 * @format
 */

import express from 'express';
import * as userController from '../../controllers/userController';

const router = express.Router();

// Methods for all users
router
  .route('/')
  /**
   * Get all Users
   * GET /api/v1/users
   * @param req GET request for all users
   * @param res Response to send back
   */
  .get((req, res) => {
    userController.getAllUsers(req, res);
  })
  /**
   * Create a new User
   * POST /api/v1/users
   * @param req POST request for new user
   * @param res Response to send back
   */
  .post((req, res) => {
    userController.createUser(req, res);
  });

// Methods for specific user
router
  .route('/:userId')
  /**
   * Get a User by id
   * GET /api/v1/users/:userId
   * @param req GET request for user by id
   * @param res Response to send back
   */
  .get((req, res) => {
    userController.getUserById(req, res);
  })
  /**
   * Update a User by id
   * PATCH /api/v1/users/:userId
   * @param req PATCH request for user by id
   * @param res Response to send back
   */
  .patch((req, res) => {
    userController.updateUserById(req, res);
  })
  /**
   * Delete a User by id
   * DELETE /api/v1/users/:userId
   * @param req DELETE request for user by id
   */
  .delete((req, res) => {
    userController.deleteUserById(req, res);
  });

export default router;
