/**
 * Entry point for the API
 *
 * @format
 */
import express from 'express';
import router from './src/v1/routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
