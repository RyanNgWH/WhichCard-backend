/**
 * The express API application
 *
 * @format
 */

import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import v1UserRouter from './src/v1/routes/userRoutes';
import v1CardRouter from './src/v1/routes/cardRoutes';
import v1MerchantRouter from './src/v1/routes/merchantRoutes';
import v1TransactionRouter from './src/v1/routes/transactionRoutes';
import connectToDatabase from './src/database/connection';

function application() {
  // Initialize express app
  const app = express();

  // Connect to database
  connectToDatabase();

  // Load JSON body parser middleware
  app.use(bodyParser.json());

  // User management routes
  app.use('/api/v1/users', v1UserRouter);
  // Card management routes
  app.use('/api/v1/cards', v1CardRouter);
  // Merchant management routes
  app.use('/api/v1/merchants', v1MerchantRouter);
  // Transaction management routes
  app.use('/api/v1/transactions', v1TransactionRouter);

  return app;
}

export default application;
