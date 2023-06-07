/**
 * Database methods for user management
 *
 * @format
 */

import DB from './db.json';
import saveToDatabase from './utils';
import User from '../shared/types';
import UserExistsError from '../shared/errors/database/userExistsError';
import DatabaseError from '../shared/errors/database/databaseError';
import toApplicationError from '../shared/errors/errors';

/**
 * Return all users in database
 * @returns All users in database
 */
const getAllUsers = () => {
  try {
    return DB.users;
  } catch (error) {
    const appError = toApplicationError(error);

    // Throw error to controller for handling
    throw new DatabaseError(appError.message, appError.code);
  }
};

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
 * @returns The created user, or throws an error if user already exists
 */
const createUser = (newUser: User) => {
  // Check if user already exists in database (using email as unique identifier)
  const userExists =
    DB.users.findIndex(user => user.email === newUser.email) > -1;
  if (userExists) {
    throw new UserExistsError(
      `User with email ${newUser.email} already exists.`,
    );
  }

  try {
    // Add new user to database
    DB.users.push(newUser);
    saveToDatabase(DB);

    return newUser;
  } catch (error) {
    const appError = toApplicationError(error);

    // Throw error to controller for handling
    throw new DatabaseError(appError.message, appError.code);
  }
};

/**
 * Update a user by id
 * @param userId Id of user to update
 * @param updates Updates to apply to user
 * @returns The updated user, or undefined if user does not exist
 */
const updateUserById = (userId: string, updates: Partial<User>) => {
  // Find index of user to update
  const userIndex = DB.users.findIndex(user => user.id === userId);

  // Check if user exists
  if (userIndex === -1) {
    return undefined;
  }

  // Create updated user object
  const updatedUser = {
    ...DB.users[userIndex],
    ...updates,
    updatedAt: new Date().getTime(),
  };

  // Update user in database
  DB.users[userIndex] = updatedUser;
  saveToDatabase(DB);

  return updatedUser;
};

/**
 * Delete a user by id
 * @param userId Id of user to delete
 */
const deleteUserById = (userId: string) => {
  // Find index of user to delete
  const userIndex = DB.users.findIndex(user => user.id === userId);

  // Check if user exists
  if (userIndex === -1) {
    // TODO: Add user not found error
    return;
  }

  // Delete user from database
  DB.users.splice(userIndex, 1);
  saveToDatabase(DB);
};

/**
 * Login a user
 * @param email User email
 * @param password User password
 * @returns The logged in user, or undefined if user does not exist or password is incorrect
 */
const login = (email: string, password: string) => {
  // Find user with matching email
  const user = DB.users.find(dbUser => dbUser.email === email);

  // Check if user exists and password matches
  if (!user || user.password !== password) {
    return undefined;
  }

  return user;
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  login,
};
