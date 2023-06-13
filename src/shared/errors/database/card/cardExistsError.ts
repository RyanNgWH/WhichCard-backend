/**
 * Custom error for when a card already exists in the database.
 *
 * @format
 */

import DatabaseError from '../databaseError';

/**
 * Error for when a user already exists in the database.
 * @extends DatabaseError
 */
class CardExistsError extends DatabaseError {
  constructor(message: string) {
    super(message, 422);
  }
}

export default CardExistsError;
