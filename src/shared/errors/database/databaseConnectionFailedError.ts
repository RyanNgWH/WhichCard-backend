/**
 * Custom error for when the database connection fails.
 *
 * @format
 */

import DatabaseError from './databaseError';

/**
 * Error for when the database connection fails.
 * @extends DatabaseError
 */
class DatabaseConnectionFailedError extends DatabaseError {
  constructor(message: string) {
    super(message, 500);
  }
}

export default DatabaseConnectionFailedError;
