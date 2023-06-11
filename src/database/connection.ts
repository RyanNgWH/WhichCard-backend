/**
 * Connection to the database (MongoDB).
 *
 * @format
 */

import mongoose from 'mongoose';

function connectToDatabase() {
  const MONGO_URL = process.env.MONGO_URL || '';

  mongoose.connect(MONGO_URL);
  const database = mongoose.connection;

  database.on('error', error => {
    // TODO: Add logging & error handling
    console.error('Error connecting to database:', error);
  });
}

export default connectToDatabase;
