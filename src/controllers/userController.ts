/**
 * Controller methods for user management
 *
 * @format
 */

import { Request, Response } from 'express';
import * as userService from '../services/userService';

/**
 * Get all users
 */
const getAllUsers = (req: Request, res: Response) => {
  const allUsers = userService.getAllUsers();
  res.send({ status: 'OK', data: allUsers });
};

/**
 * Get a user by id
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
 */
const updateUserById = (req: Request, res: Response) => {
  // Extract body and userId from request/request parameters
  const {
    body,
    params: { userId },
  } = req;

  // Check if request body is valid
  if (!userId) {
    // TODO: Add invalid request body error (express-validator?)
    return;
  }

  const updatedUser = userService.updateUserById(userId, body);
  res.send({ status: 'OK', data: updatedUser });
};

/**
 * Delete a user by id
 */
const deleteUserById = (req: Request, res: Response) => {
  userService.deleteUserById();
  res.send(`Delete an existing user with ID:${req.params.userId}`);
};

export { getAllUsers, getUserById, createUser, updateUserById, deleteUserById };
