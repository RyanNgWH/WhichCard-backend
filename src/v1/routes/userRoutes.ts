/**
 * Routes for user management
 *
 * @format
 */

import express from 'express';
import * as userController from '../../controllers/userController';

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
    userController.getAllUsers(req, res);
  })
  /**
   * Create a new User
   * POST /api/v1/users
   */
  .post((req, res) => {
    userController.createUser(req, res);
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
    userController.getUserById(req, res);
  })
  /**
   * Update a User by id
   * PATCH /api/v1/users/:userId
   */
  .patch((req, res) => {
    userController.updateUserById(req, res);
  })
  /**
   * Delete a User by id
   */
  .delete((req, res) => {
    userController.deleteUserById(req, res);
  });

export default router;
