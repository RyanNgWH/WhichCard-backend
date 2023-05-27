/**
 * Database methods for user management
 *
 * @format
 */

import DB from './db.json';
import saveToDatabase from './utils';
import { User } from '../shared/types';

/**
 * Return all users in database
 * @returns All users in database
 */
const getAllUsers = () => DB.users;

/**
 * Get a user by id
 * @param userId Id of user to get
 * @returns The user with the given id, or null if user does not exist
 */
const getUserById = (userId: string) =>
  DB.users.find(user => user.id === userId);

/**
 * Create a new user and save to database
 * @param newUser User to create
 * @returns The created user, or null if user already exists
 */
const createUser = (newUser: User) => {
  // Check if user already exists in database
  const userExists =
    DB.users.findIndex(user => user.email === newUser.email) > -1;
  if (userExists) {
    // TODO: Add user already exists error
    return null;
  }

  // Add new user to database
  DB.users.push(newUser);
  saveToDatabase(DB);

  return newUser;
};

export { getAllUsers, getUserById, createUser };
