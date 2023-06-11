/**
 * Services (logic) for user management
 *
 * @format
 */

import { v4 as uuidv4 } from 'uuid';
import * as UserDatabase from '../database/userDatabase';
import User from '../shared/types';

/**
 * Get all users
 * @returns All users
 */
async function getAllUsers() {
  const users = await UserDatabase.getAllUsers();
  return users;
}

/**
 * Get a user by id
 * @param userId Id of user to get
 * @returns The user with the given id, or undefined if user does not exist
 */
const getUserById = (userId: string) => UserDatabase.getUserById(userId);

/**
 * Create a new user
 * @param newUser User to create
 * @returns The created user, or throws an error if user already exists
 */
async function createUser(newUser: Pick<User, 'name' | 'email' | 'password'>) {
  // Create new user object with id and timestamps
  const userToAdd = {
    ...newUser,
    _id: uuidv4(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  // Pass new user to database to save user to database
  const createdUser = await UserDatabase.createUser(userToAdd);
  return createdUser;
}

/**
 * Update a user by id
 * @param userId Id of user to update
 * @param updates Updates to apply to user
 * @returns The updated user, or undefined if user does not exist
 */
const updateUserById = (userId: string, updates: Partial<User>) =>
  UserDatabase.updateUserById(userId, updates);

/**
 * Delete a user by id
 * @param userId Id of user to delete
 */
const deleteUserById = (userId: string) => UserDatabase.deleteUserById(userId);

/**
 * Login a user
 * @param email Email of user to login
 * @param password Password of user to login
 * @returns The logged in user, or undefined if user does not exist
 */
const login = (email: string, password: string) =>
  UserDatabase.login(email, password);

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  login,
};
