/**
 * Controller methods for user management
 *
 * @format
 */

import { Request, Response } from 'express';
import * as userService from '../services/userService';

/**
 * Get all users
 * @param req GET request for all users
 * @param res Response to send back
 */
const getAllUsers = (req: Request, res: Response) => {
  const allUsers = userService.getAllUsers();
  res.send({ status: 'OK', data: allUsers });
};

/**
 * Get a user by id
 * @param req GET request for user by id
 * @param res Response to send back
 */
const getUserById = (req: Request, res: Response) => {
  // Extract userId from request parameters
  const { userId } = req.params;

  // Pass userId to service to get user from database
  const user = userService.getUserById(userId);

  res.send({ status: 'OK', data: user });
};

/**
 * Create a new user
 * @param req POST request for new user
 * @param res Response to send back
 */
const createUser = (req: Request, res: Response) => {
  // Extract request body
  const { body } = req;

  // Check if request body is valid
  if (!body.name || !body.email || !body.password) {
    // TODO: Add invalid request body error (express-validator?)
    return;
  }

  // Create new user
  const newUser = {
    name: body.name,
    email: body.email,
    password: body.password,
  };

  // Pass new user to service to save user to database
  const createdUser = userService.createUser(newUser);

  // Respond with created user
  res.status(201).send({ status: 'OK', data: createdUser });
};

/**
 * Update a user by id
 * @param req PATCH request for user by id
 * @param res Response to send back
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

  const updatedUser = userService.updateUserById(userId, body);
  res.send({ status: 'OK', data: updatedUser });
};

/**
 * Delete a user by id
 * @param req DELETE request for user by id
 * @param res Response to send back
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

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  login,
};
