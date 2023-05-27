/**
 * Database methods for user management
 *
 * @format
 */

import DB from './db.json';
import saveToDatabase from './utils';
import { User } from '../shared/types';

const getAllUsers = () => DB.users;

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

export { getAllUsers, createUser };
