/**
 * Custom error for when a card is not found in the database.
 *
 * @format
 */

import DatabaseError from '../databaseError';

/**
 * Error for when a user is not found in the database.
 * @extends DatabaseError
 */
class CardNotFoundError extends DatabaseError {
  constructor(message: string, code?: number) {
    super(message, code || 404);
  }
}

export default CardNotFoundError;
