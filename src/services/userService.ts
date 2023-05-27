/**
 * Services (logic) for user management
 *
 * @format
 */

import { v4 as uuidv4 } from 'uuid';
import * as UserDatabase from '../database/UserDatabase';
import { PostUser } from '../shared/types';

/**
 * Get all users
 */
const getAllUsers = () => UserDatabase.getAllUsers();

/**
 * Get a user by id
 */
const getUserById = () => {
  return;
};

/**
 * Create a new user
 */
const createUser = (newUser: PostUser) => {
  const userToAdd = {
    ...newUser,
    id: uuidv4(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  const createdUser = UserDatabase.createUser(userToAdd);
  return createdUser;
};

/**
 * Update a user by id
 */
const updateUserById = () => {
  return;
};

/**
 * Delete a user by id
 */
const deleteUserById = () => {
  return;
};

export { getAllUsers, getUserById, createUser, updateUserById, deleteUserById };
