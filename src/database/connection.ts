/**
 * Connection to the database (MongoDB).
 *
 * @format
 */

import mongoose from 'mongoose';
import DatabaseConnectionFailedError from '../shared/errors/database/databaseConnectionFailedError';

function connectToDatabase() {
  // Set database connection path based on environment
  const MONGO_URL =
    process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URL_TEST || ''
      : process.env.MONGO_URL || '';

  mongoose.connect(MONGO_URL);
  const database = mongoose.connection;

  database.on('error', error => {
    // TODO: Add logging
    throw new DatabaseConnectionFailedError(error.message);
  });
}

export default connectToDatabase;
