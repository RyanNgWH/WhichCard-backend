/**
 * Services (logic) for user management
 *
 * @format
 */

import { v4 as uuidv4 } from 'uuid';
import * as userDatabase from '../database/userDatabase';
import { User } from '../shared/types';

/**
 * Get all users
 * @returns All users
 */
async function getAllUsers() {
  const users = await userDatabase.getAllUsers();
  return users;
}

/**
 * Get a user by id
 * @param userId Id of user to get
 * @returns The user with the given id, or throws an error if user does not exist
 */
async function getUserById(userId: string) {
  const user = await userDatabase.getUserById(userId);
  return user;
}

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
  const createdUser = await userDatabase.createUser(userToAdd);
  return createdUser;
}

/**
 * Update a user by id
 * @param userId Id of user to update
 * @param updates Updates to apply to user
 * @returns The updated user, or throws an error user does not exist
 */
async function updateUserById(userId: string, updates: Partial<User>) {
  const user = await userDatabase.updateUserById(userId, updates);
  return user;
}

/**
 * Delete a user by id
 * @param userId Id of user to delete
 */
async function deleteUserById(userId: string) {
  userDatabase.deleteUserById(userId);
}

/**
 * Login a user
 * @param email Email of user to login
 * @param password Password of user to login
 * @returns The logged in user, or undefined if user does not exist
 */
async function login(email: string, password: string) {
  const user = await userDatabase.login(email, password);
  return user;
}

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  login,
};
