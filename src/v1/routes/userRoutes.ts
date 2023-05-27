/**
 * Routes for user management
 *
 * @format
 */

import express from 'express';
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../../controllers/userController';

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
    getAllUsers(req, res);
  })
  /**
   * Create a new User
   * POST /api/v1/users
   */
  .post((req, res) => {
    createUser(req, res);
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
    getUserById(req, res);
  })
  /**
   * Update a User by id
   * PATCH /api/v1/users/:userId
   */
  .patch((req, res) => {
    updateUserById(req, res);
  })
  /**
   * Delete a User by id
   */
  .delete((req, res) => {
    deleteUserById(req, res);
  });

export default router;
