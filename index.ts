/**
 * Entry point for the API
 *
 * @format
 */
import express from 'express';
import v1UserRouter from './src/v1/routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/v1/users', v1UserRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
