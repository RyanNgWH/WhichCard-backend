/**
 * Entry point for the API
 *
 * @format
 */
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import v1UserRouter from './src/v1/routes/userRoutes';
import connectToDatabase from './src/database/connection';

// Initialize express app and api port
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectToDatabase();

// Load JSON body parser middleware
app.use(bodyParser.json());

// User management routes
app.use('/api/v1/users', v1UserRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
