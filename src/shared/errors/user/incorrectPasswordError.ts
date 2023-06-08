/**
 * Custom error for when a user's credentials is incorrect.
 *
 * @format
 */

import UserFacingError from './userFacingError';

/**
 * Error for when a user already exists in the database.
 * @extends DatabaseError
 */
class IncorrectCredentialsError extends UserFacingError {
  constructor(message: string) {
    super(message, 401);
  }
}

export default IncorrectCredentialsError;
