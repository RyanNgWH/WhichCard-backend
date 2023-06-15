/**
 * Routes for user management
 *
 * @format
 */

import express, { Request, Response } from 'express';
import * as userController from '../../controllers/userController';

const router = express.Router();

// TODO: Implement validation for invalid routes

// Methods for all users
router
  .route('/')
  /**
   * Get all Users
   * GET /api/v1/users
   * @param req GET request for all users
   * @param res Response to send back
   */
  .get((req: Request, res: Response) => {
    userController.getAllUsers(req, res);
  })
  /**
   * Create a new User
   * POST /api/v1/users
   * @param req POST request for new user
   * @param res Response to send back
   */
  .post(
    userController.validate('createUser'),
    (req: Request, res: Response) => {
      userController.createUser(req, res);
    },
  );

// Methods for specific user
router
  .route('/:userId')
  /**
   * Get a User by id
   * GET /api/v1/users/:userId
   * @param req GET request for user by id
   * @param res Response to send back
   */
  .get(
    userController.validate('getUserById'),
    (req: Request, res: Response) => {
      userController.getUserById(req, res);
    },
  )
  /**
   * Update a User by id
   * PATCH /api/v1/users/:userId
   * @param req PATCH request for user by id
   * @param res Response to send back
   */
  .patch(
    userController.validate('updateUserById'),
    (req: Request, res: Response) => {
      userController.updateUserById(req, res);
    },
  )
  /**
   * Delete a User by id
   * DELETE /api/v1/users/:userId
   * @param req DELETE request for user by id
   * @param res Response to send back
   */
  .delete(
    userController.validate('deleteUserById'),
    (req: Request, res: Response) => {
      userController.deleteUserById(req, res);
    },
  );

// Methods for user cards
router
  .route('/:userId/cards')
  /**
   * Get all Cards for a User
   * GET /api/v1/users/:userId/cards
   * @param req GET request for all cards for a user
   * @param res Response to send back
   */
  .get(
    userController.validate('getAllUserCards'),
    (req: Request, res: Response) => {
      userController.getAllUserCards(req, res);
    },
  )
  /**
   * Add a Card to a User
   * POST /api/v1/users/:userId/cards
   * @param req POST request for adding a card to a user
   * @param res Response to send back
   */
  .post(
    userController.validate('addUserCard'),
    (req: Request, res: Response) => {
      userController.addUserCard(req, res);
    },
  );

// Methods for logging in
router
  .route('/login')
  /**
   * Login a User
   * POST /api/v1/users/login
   */
  .post(userController.validate('login'), (req: Request, res: Response) => {
    userController.login(req, res);
  });

export default router;
