/**
 * Custom error for when a merchant is not found in the database.
 *
 * @format
 */

import DatabaseError from '../databaseError';

/**
 * Error for when a merchant is not found in the database.
 * @extends DatabaseError
 */
class MerchantNotFoundError extends DatabaseError {
  constructor(message: string, code?: number) {
    super(message, code || 404);
  }
}

export default MerchantNotFoundError;
