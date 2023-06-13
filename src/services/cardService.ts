/**
 * Services (logic) for card management
 *
 * @format
 */

import { v4 as uuidv4 } from 'uuid';
import * as cardDatabase from '../database/cardDatabase';
import { Card } from '../shared/types';

/**
 * Get all cards
 * @returns All cards
 */
async function getAllCards() {
  const cards = await cardDatabase.getAllCards();
  return cards;
}

/**
 * Create a new card
 * @param newCard Card to create
 * @returns The created card, or throws an error if card already exists
 */
async function createCard(
  newCard: Pick<
    Card,
    | 'type'
    | 'issuer'
    | 'benefits'
    | 'exclusions'
    | 'cashbackLimit'
    | 'minimumSpend'
  >,
) {
  // Create new card object with id and timestamps
  const cardToAdd = {
    ...newCard,
    _id: uuidv4(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  // Pass new card to database to save card to database
  const createdCard = await cardDatabase.createCard(cardToAdd);
  return createdCard;
}

export { getAllCards, createCard };
