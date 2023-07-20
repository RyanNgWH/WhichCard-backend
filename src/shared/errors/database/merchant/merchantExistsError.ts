/**
 * Custom error for when a merchant already exists in the database.
 *
 * @format
 */

import DatabaseError from '../databaseError';

/**
 * Error for when a user already exists in the database.
 * @extends DatabaseError
 */
class MerchantExistsError extends DatabaseError {
  constructor(message: string, code?: number) {
    super(message, code || 422);
  }
}

export default MerchantExistsError;
