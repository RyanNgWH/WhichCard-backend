/**
 * Custom error for when a user's does not have any cards.
 *
 * @format
 */

import UserFacingError from './userFacingError';

/**
 * Error for when a user already exists in the database.
 * @extends DatabaseError
 */
class NoCardsError extends UserFacingError {
  constructor(message: string) {
    super(message, 422);
  }
}

export default NoCardsError;
