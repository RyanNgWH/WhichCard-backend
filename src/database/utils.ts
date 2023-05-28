/**
 * Utilities for database management
 *
 * @format
 */

import fs from 'fs';

/**
 * Save database to file
 * @param db Database to save
 */
const saveToDatabase = (db: Object) => {
  fs.writeFileSync('./src/database/db.json', JSON.stringify(db, null, 2), {
    encoding: 'utf8',
  });
  // TODO: Add error handling (Error classes?)
};

export default saveToDatabase;
