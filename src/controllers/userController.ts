/**
 * Controller methods for user management
 *
 * @format
 */

import { Request, Response } from 'express';

/**
 * Get all users
 */
const getAllUsers = (req: Request, res: Response) => {
  res.send('Get all users');
};

/**
 * Get a user by id
 */
const getUserById = (req: Request, res: Response) => {
  res.send(`Get an existing user with ID:${req.params.userId}`);
};

/**
 * Create a new user
 */
const createUser = (req: Request, res: Response) => {
  res.send('Create a user');
};

/**
 * Update a user by id
 */
const updateUserById = (req: Request, res: Response) => {
  res.send(`Update an existing user with ID:${req.params.userId}`);
};

/**
 * Delete a user by id
 */
const deleteUserById = (req: Request, res: Response) => {
  res.send(`Delete an existing user with ID:${req.params.userId}`);
};

export { getAllUsers, getUserById, createUser, updateUserById, deleteUserById };
