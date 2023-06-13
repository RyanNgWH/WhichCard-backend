/**
 * Database methods for card management
 *
 * @format
 */

import CardExistsError from '../shared/errors/database/card/cardExistsError';
import DatabaseError from '../shared/errors/database/databaseError';
import toApplicationError from '../shared/errors/errorHelpers';
import { Card } from '../shared/types';
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

/**
 * Create a new card and save to database
 * @param newCard Card to create
 * @returns The created card, or throws an error if card already exists
 */
async function createCard(newCard: Card) {
  try {
    // Check if card already exists in database (using type & issuer as unique identifier)
    if (
      await CardModel.exists({ type: newCard.type, issuer: newCard.issuer })
    ) {
      throw new CardExistsError(
        `Card with type ${newCard.type} and issuer ${newCard.issuer} already exists.`,
      );
    }

    // Create new card object in database
    const createdCard = await CardModel.create(newCard);
    return createdCard;
  } catch (error) {
    const appError = toApplicationError(error);
    throw new DatabaseError(appError.message, appError.code);
  }
}

export { getAllCards, createCard };
