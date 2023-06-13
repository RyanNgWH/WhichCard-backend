/**
 * Database methods for card management
 *
 * @format
 */

import DatabaseError from '../shared/errors/database/databaseError';
import toApplicationError from '../shared/errors/errorHelpers';
import CardModel from './models/cardModels';

/**
 * Return all cards in database
 * @returns All cards in database
 */
async function getAllCards() {
  try {
    const cards = await CardModel.find();
    return cards;
  } catch (error) {
    const appError = toApplicationError(error);
    throw new DatabaseError(appError.message, appError.code);
  }
}

export { getAllCards };
