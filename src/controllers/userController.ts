/**
 * Controller methods for user management
 *
 * @format
 */

import { Request, Response } from 'express';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import * as userService from '../services/userService';
import toApplicationError from '../shared/errors/errors';
import {
  emailSchema,
  nameSchema,
  newPasswordSchema,
  passwordSchema,
  userIdSchema,
} from '../shared/schemas/userSchemas';
import { createSchema } from '../shared/schemas/schemas';

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
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract userId from request parameters
  const { userId } = req.params;

  try {
    // Pass userId to service to get user from database
    const user = userService.getUserById(userId);
    res.send({ status: 'OK', data: user });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
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
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract body and userId from verified request/request parameters
  const params = matchedData(req, { locations: ['params'] });
  const body = matchedData(req, { locations: ['body'] });

  try {
    // Pass userId and updates to service to update user in database
    const updatedUser = userService.updateUserById(params.userId, body);
    res.send({ status: 'OK', data: updatedUser });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
};

/**
 * Delete a user by id
 * @param req DELETE request for user by id
 * @param res Status code 204 and empty body
 */
const deleteUserById = (req: Request, res: Response) => {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract parameters from request parameters
  const params = matchedData(req, { locations: ['params'] });

  try {
    // Pass userId to service to delete user from database
    userService.deleteUserById(params.userId);
    res.status(204).send({ status: 'OK' });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
};

/**
 * Login a user
 * @param req POST request for user login
 * @param res Response to send back (200 with user data or 401)
 */
const login = (req: Request, res: Response) => {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract request body
  const body = matchedData(req, { locations: ['body'] });

  try {
    // Pass email and password to service to login user
    const user = userService.login(body.email, body.password);
    res.send({ status: 'OK', data: user });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
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
      return checkSchema(
        createSchema([
          { fieldSchema: nameSchema, optional: false, in: ['body'] },
          { fieldSchema: emailSchema, optional: false, in: ['body'] },
          { fieldSchema: newPasswordSchema, optional: false, in: ['body'] },
        ]),
      );
    case 'getUserById':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['params'] },
        ]),
      );
    case 'updateUserById':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['params'] },
          { fieldSchema: nameSchema, optional: true, in: ['body'] },
          // TODO: Decide if email should be updatable
          // { fieldSchema: emailSchema, optional: true, in: ['body'] },
          { fieldSchema: newPasswordSchema, optional: true, in: ['body'] },
        ]),
      );
    case 'deleteUserById':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['params'] },
        ]),
      );
    case 'login':
      return checkSchema(
        createSchema([
          { fieldSchema: emailSchema, optional: false, in: ['body'] },
          { fieldSchema: passwordSchema, optional: false, in: ['body'] },
        ]),
      );
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
