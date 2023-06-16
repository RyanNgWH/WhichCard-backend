/**
 * Custom error for when a user is not found in the database.
 *
 * @format
 */

import DatabaseError from '../databaseError';

/**
 * Error for when a user is not found in the database.
 * @extends DatabaseError
 */
class UserNotFoundError extends DatabaseError {
  constructor(message: string, code?: number) {
    super(message, code || 404);
  }
}

export default UserNotFoundError;
