/**
 * Custom error for when a user already exists in the database.
 *
 * @format
 */

import DatabaseError from '../databaseError';

/**
 * Error for when a user already exists in the database.
 * @extends DatabaseError
 */
class UserExistsError extends DatabaseError {
  constructor(message: string, code?: number) {
    super(message, code || 422);
  }
}

export default UserExistsError;
