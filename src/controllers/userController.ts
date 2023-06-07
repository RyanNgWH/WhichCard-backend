/**
 * Controller methods for user management
 *
 * @format
 */

import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as userService from '../services/userService';
import toApplicationError from '../shared/errors/errors';

/**
 * Get all users
 * @param req GET request for all users
 * @param res Status code 200 and all users in database
 */
const getAllUsers = (req: Request, res: Response) => {
  try {
    const allUsers = userService.getAllUsers();
    res.send({ status: 'OK', data: allUsers });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
};

/**
 * Get a user by id
 * @param req GET request for user by id
 * @param res Status code 200 and user with given id or 404 if user does not exist
 */
const getUserById = (req: Request, res: Response) => {
  // Extract userId from request parameters
  const { userId } = req.params;

  // Pass userId to service to get user from database
  const user = userService.getUserById(userId);

  // Check if user exists
  if (user) {
    res.send({ status: 'OK', data: user });
  } else {
    res.status(404).send({ status: 'Not Found' });
  }
};

/**
 * Create a new user
 * @param req POST request for new user
 * @param res Status code 201 and created user or 422 if user already exists
 */
const createUser = (req: Request, res: Response) => {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Create new user
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // Pass new user to service to save user to database
    const createdUser = userService.createUser(newUser);
    res.status(201).send({ status: 'OK', data: createdUser });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
};

/**
 * Update a user by id
 * @param req PATCH request for user by id
 * @param res Status code 200 and updated user or 404 if user does not exist
 */
const updateUserById = (req: Request, res: Response) => {
  // Extract body and userId from request/request parameters
  const {
    body,
    params: { userId },
  } = req;

  // Check if userId is present
  if (!userId) {
    // TODO: Add invalid request body error (express-validator?)
    return;
  }

  // Pass userId and updates to service to update user in database
  const updatedUser = userService.updateUserById(userId, body);

  // Check if user exists
  if (updatedUser) {
    res.send({ status: 'OK', data: updatedUser });
  } else {
    res.status(404).send({ status: 'Not Found' });
  }
};

/**
 * Delete a user by id
 * @param req DELETE request for user by id
 * @param res Status code 204 and empty body
 */
const deleteUserById = (req: Request, res: Response) => {
  // Extract userId from request parameters
  const { userId } = req.params;

  // Check if userId is present
  if (!userId) {
    // TODO: Add invalid request body error (express-validator?)
    return;
  }

  // Pass userId to service to delete user from database
  userService.deleteUserById(userId);
  res.status(204).send({ status: 'OK' });
};

/**
 * Login a user
 * @param req POST request for user login
 * @param res Response to send back (200 with user data or 401)
 */
const login = (req: Request, res: Response) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Check if email and password are present
  if (!email || !password) {
    // TODO: Add invalid request body error (express-validator?)
    return;
  }

  // Pass email and password to service to login user
  const user = userService.login(email, password);

  // Check if user was found
  if (user) {
    res.send({ status: 'OK', data: user });
  } else {
    res.status(401).send({ status: 'Unauthorized' });
  }
};

/**
 * Validate request body
 * @param method Method to validate
 * @returns Array of validation checks
 */
function validate(method: String) {
  switch (method) {
    case 'createUser':
      return [
        body('name', 'Invalid Name')
          .notEmpty()
          .withMessage('Name is required')
          .isAlphanumeric()
          .withMessage('Name must be alphanumeric'),
        body('email', 'Invalid email')
          .notEmpty()
          .withMessage('Email is required')
          .isEmail()
          .normalizeEmail(),
        body('password', 'Invalid Password')
          .notEmpty()
          .withMessage('Password is required')
          .isStrongPassword()
          .withMessage('Password does not meet requirements'),
      ];
    default:
      return [];
  }
}

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  login,
  validate,
};
