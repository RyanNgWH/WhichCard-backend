/**
 * Custom error for when a transaction is not found in the database.
 *
 * @format
 */

import DatabaseError from '../databaseError';

/**
 * Error for when a transaction is not found in the database.
 * @extends DatabaseError
 */
class TransactionNotFoundError extends DatabaseError {
  constructor(message: string, code?: number) {
    super(message, code || 404);
  }
}

export default TransactionNotFoundError;
