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
 * Get a card by id
 * @param cardId Id of card to get
 * @returns The card with the given id, or throws and error if card does not exist
 */
async function getCardById(cardId: string) {
  const card = await cardDatabase.getCardById(cardId);
  return card;
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

/**
 * Update a card by id
 * @param cardId Id of card to update
 * @param updates Updates to apply to card
 * @returns The updated card, or throws an error if card does not exist
 */
async function updateCardById(cardId: string, updates: Partial<Card>) {
  const card = await cardDatabase.updateCardById(cardId, updates);
  return card;
}

export { getAllCards, getCardById, createCard, updateCardById };
