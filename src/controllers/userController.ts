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
  res.send('Get all users');
};

/**
 * Get a user by id
 */
const getUserById = (req: Request, res: Response) => {
  const user = userService.getUserById();
  res.send(`Get an existing user with ID:${req.params.userId}`);
};

/**
 * Create a new user
 */
const createUser = (req: Request, res: Response) => {
  const newUser = userService.createUser();
  res.send('Create a user');
};

/**
 * Update a user by id
 */
const updateUserById = (req: Request, res: Response) => {
  const updatedUser = userService.updateUserById();
  res.send(`Update an existing user with ID:${req.params.userId}`);
};

/**
 * Delete a user by id
 */
const deleteUserById = (req: Request, res: Response) => {
  userService.deleteUserById();
  res.send(`Delete an existing user with ID:${req.params.userId}`);
};

export { getAllUsers, getUserById, createUser, updateUserById, deleteUserById };
