/**
 * Database methods for user management
 *
 * @format
 */

import DB from './db.json';

const getAllUsers = () => DB.users;

export { getAllUsers };
