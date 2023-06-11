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
import toApplicationError from '../shared/errors/errorHelpers';
import UserNotFoundError from '../shared/errors/database/userNotFoundError';
import IncorrectCredentialsError from '../shared/errors/user/incorrectPasswordError';
import UserModel from './models/userModels';

/**
 * Return all users in database
 * @returns All users in database
 */
async function getAllUsers() {
  const users = await UserModel.find();
  return users;
}

/**
 * Get a user by id
 * @param userId Id of user to get
 * @returns The user with the given id, or throws an error if user does not exist
 */
async function getUserById(userId: string) {
  // Find user with matching id from database
  const user = await UserModel.findById(userId);

  // Check if user exists
  if (!user) {
    throw new UserNotFoundError(`User with id ${userId} not found.`);
  }

  return user;
}

/**
 * Create a new user and save to database
 * @param newUser User to create
 * @returns The created user, or throws an error if user already exists
 */
async function createUser(newUser: User) {
  // Check if user already exists in database (using email as unique identifier)
  if (await UserModel.exists({ email: newUser.email })) {
    throw new UserExistsError(
      `User with email ${newUser.email} already exists.`,
    );
  }

  const createdUser = await UserModel.create(newUser);
  return createdUser;
}

/**
 * Update a user by id
 * @param userId Id of user to update
 * @param updates Updates to apply to user
 * @returns The updated user, or throws an error if user does not exist
 */
const updateUserById = (userId: string, updates: Partial<User>) => {
  // Find index of user to update
  const userIndex = DB.users.findIndex(user => user.id === userId);

  // Check if user exists
  if (userIndex === -1) {
    throw new UserNotFoundError(`User with id ${userId} not found.`);
  }

  // Check if email is being updated
  if (updates.email) {
    // Check if email already exists in database
    const emailExists =
      DB.users.findIndex(user => user.email === updates.email) > -1;
    if (emailExists) {
      throw new UserExistsError(
        `The email ${updates.email} is already in use.`,
      );
    }
  }

  // Create updated user object
  const updatedUser = {
    ...DB.users[userIndex],
    ...updates,
    updatedAt: new Date().getTime(),
  };

  try {
    // Update user in database
    DB.users[userIndex] = updatedUser;
    saveToDatabase(DB);

    return updatedUser;
  } catch (error) {
    const appError = toApplicationError(error);

    // Throw error to controller for handling
    throw new DatabaseError(appError.message, appError.code);
  }
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
    // No error thrown if user does not exist as the user does not exist in the database
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

  // Check if user exists and password is correct
  if (!user || user.password !== password) {
    throw new IncorrectCredentialsError('Incorrect credentials.');
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
