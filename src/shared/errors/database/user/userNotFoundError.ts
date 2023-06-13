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
  constructor(message: string) {
    super(message, 404);
  }
}

export default UserNotFoundError;
