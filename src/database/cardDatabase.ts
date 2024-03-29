/**
 * Database methods for card management
 *
 * @format
 */

import ApplicationError from '../shared/errors/application/applicationError';
import CardExistsError from '../shared/errors/database/card/cardExistsError';
import CardNotFoundError from '../shared/errors/database/card/cardNotFoundError';
import DatabaseError from '../shared/errors/database/databaseError';
import toApplicationError from '../shared/errors/errorHelpers';
import { Card } from '../shared/types';
import CardModel from './models/cardModels';
import UserModel from './models/userModels';

/**
 * Return all cards in database
 * @returns All cards in database
 */
async function getAllCards() {
  try {
    const cards = await CardModel.find();
    return cards;
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

/**
 * Get a card by id
 * @param cardId Id of card to get
 * @returns The card with the given id, or throws an error if card does not exist
 */
async function getCardById(cardId: string) {
  try {
    // Find card with matching id from database
    const card = await CardModel.findById(cardId);

    // Check if card exists
    if (!card) {
      throw new CardNotFoundError(`Card with id '${cardId}' not found.`);
    }

    return card;
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

/**
 * Get a card id by type and issuer
 * @param type Type of card to get
 * @param issuer Issuer of card to get
 * @returns The id of the card with the given type and issuer, or throws an error if card does not exist
 */
async function getCardId(issuer: string, type: string) {
  try {
    // Find card with matching type and issuer from database
    const card = await CardModel.findOne({ type, issuer });
    if (!card) {
      throw new CardNotFoundError(
        `Card with type '${type}' and issuer '${issuer}' not found.`,
      );
    }

    // eslint-disable-next-line no-underscore-dangle
    return card._id;
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
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
        `Card with type '${newCard.type}' and issuer '${newCard.issuer}' already exists.`,
      );
    }

    // Create new card object in database
    const createdCard = await CardModel.create(newCard);
    return createdCard;
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

/**
 * Update a card in database
 * @param cardId Id of card to update
 * @param updates Updates to apply to card
 * @returns The updated card, or throws an error if card does not exist
 */
async function updateCardById(cardId: string, updates: Partial<Card>) {
  try {
    // Find card with matching id from database
    const card = await CardModel.findById(cardId);

    // Check if card exists
    if (!card) {
      throw new CardNotFoundError(`Card with id '${cardId}' not found.`);
    }

    // Check if updates would cause card to be a duplicate
    if (updates.issuer && updates.type) {
      if (
        await CardModel.exists({ type: updates.type, issuer: updates.issuer })
      ) {
        throw new CardExistsError(
          `Card with type '${updates.type}' and issuer '${updates.issuer}' already exists.`,
        );
      }
    }

    // Update card with new values
    card.set(updates);
    card.updatedAt = new Date().getTime();

    // Save updated card to database
    const updatedCard = await card.save();
    return updatedCard;
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

/**
 * Delete a card from database
 * @param cardId Id of card to delete
 */
async function deleteCardById(cardId: string) {
  try {
    // Get all users that have this card
    const users = await UserModel.find({ 'cards.card': cardId });

    // Remove card from each user
    users.forEach(async user => {
      // eslint-disable-next-line no-param-reassign
      user.cards = user.cards.filter(card => card.card !== cardId);
      await user.save();
    });

    // Delete card from database
    await CardModel.findByIdAndDelete(cardId);
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

export {
  getAllCards,
  getCardById,
  createCard,
  updateCardById,
  deleteCardById,
  getCardId,
};
