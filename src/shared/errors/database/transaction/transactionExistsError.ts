/**
 * Custom error for when a transaction already exists in the database.
 *
 * @format
 */

import DatabaseError from '../databaseError';

/**
 * Error for when a user already exists in the database.
 * @extends DatabaseError
 */
class TransactionExistsError extends DatabaseError {
  constructor(message: string, code?: number) {
    super(message, code || 422);
  }
}

export default TransactionExistsError;
