/**
 * Connection to the database (MongoDB).
 *
 * @format
 */

import mongoose from 'mongoose';
import DatabaseConnectionFailedError from '../shared/errors/database/databaseConnectionFailedError';

function connectToDatabase() {
  const MONGO_URL = process.env.MONGO_URL || '';

  mongoose.connect(MONGO_URL);
  const database = mongoose.connection;

  database.on('error', error => {
    // TODO: Add logging
    throw new DatabaseConnectionFailedError(error.message);
  });
}

export default connectToDatabase;
