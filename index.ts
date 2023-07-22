/**
 * Entry point for the API
 *
 * @format
 */

import application from './app';

const PORT = process.env.PORT || 3000;

application().listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
