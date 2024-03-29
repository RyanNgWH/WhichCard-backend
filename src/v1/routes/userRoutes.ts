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

// Methods for card recommendations
router
  .route('/:userId/recommend')
  /**
   * Recommend a Card for a transaction
   * POST /api/v1/users/:userId/recommend
   * @param req POST request for recommending a card for a transaction
   * @param res Response to send back
   */
  .post(
    userController.validate('recommendCard'),
    (req: Request, res: Response) => {
      userController.recommendCard(req, res);
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

// Methods for specific user card
router
  .route('/:userId/cards/:cardName')
  /**
   * Get a specific card for a user by name
   * GET /api/v1/users/:userId/cards/:cardName
   * @param req GET request for a specific card for a user by name
   * @param res Response to send back
   */
  .get(
    userController.validate('getUserCardByName'),
    (req: Request, res: Response) => {
      userController.getUserCardByName(req, res);
    },
  )
  /**
   * Update a specific card for a user by name
   * PATCH /api/v1/users/:userId/cards/:cardName
   * @param req PATCH request for a specific card for a user by name
   * @param res Response to send back
   */
  .patch(
    userController.validate('updateUserCardByName'),
    (req: Request, res: Response) => {
      userController.updateUserCardByName(req, res);
    },
  )
  /**
   * Delete a specific card for a user by name
   * DELETE /api/v1/users/:userId/cards/:cardName
   * @param req DELETE request for a specific card for a user by name
   * @param res Response to send back
   */
  .delete(
    userController.validate('deleteUserCardByName'),
    (req: Request, res: Response) => {
      userController.deleteUserCardByName(req, res);
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
