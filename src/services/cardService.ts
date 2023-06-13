/**
 * Services (logic) for card management
 *
 * @format
 */

import * as cardDatabase from '../database/cardDatabase';

/**
 * Get all cards
 * @returns All cards
 */
async function getAllCards() {
  const cards = await cardDatabase.getAllCards();
  return cards;
}

export { getAllCards };
