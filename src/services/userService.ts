/**
 * Services (logic) for user management
 *
 * @format
 */

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import * as cardDatabase from '../database/cardDatabase';
import * as userDatabase from '../database/userDatabase';
import * as merchantDatabase from '../database/merchantDatabase';
import * as transactionDatabase from '../database/transactionDatabase';
import { Transaction, User, UserCardRequest } from '../shared/types';
import CardNotFoundError from '../shared/errors/database/card/cardNotFoundError';
import NoCardsError from '../shared/errors/user/noCardsError';
import ApplicationError from '../shared/errors/application/applicationError';
import toApplicationError from '../shared/errors/errorHelpers';
import getCategory from '../shared/categories';

/**
 * Hash Password
 * @param password Password to hash
 * @returns Hashed password
 */
async function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Get all users
 * @returns All users
 */
async function getAllUsers() {
  const users = await userDatabase.getAllUsers();
  return users;
}

/**
 * Get a user by id
 * @param userId Id of user to get
 * @returns The user with the given id, or throws an error if user does not exist
 */
async function getUserById(userId: string) {
  const user = await userDatabase.getUserById(userId);
  return user;
}

/**
 * Create a new user
 * @param newUser User to create
 * @returns The created user, or throws an error if user already exists
 */
async function createUser(
  newUser: Pick<User, 'name' | 'email' | 'password' | 'cards'>,
) {
  // Create new user object with id and timestamps
  const passwordHash = await hashPassword(newUser.password);
  const userToAdd = {
    ...newUser,
    _id: uuidv4(),
    password: passwordHash,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  // Pass new user to database to save user to database
  const createdUser = await userDatabase.createUser(userToAdd);
  return createdUser;
}

/**
 * Update a user by id
 * @param userId Id of user to update
 * @param updates Updates to apply to user
 * @returns The updated user, or throws an error user does not exist
 */
async function updateUserById(userId: string, updates: Partial<User>) {
  const updatesWithHash = {
    ...(updates.password
      ? { ...updates, password: await hashPassword(updates.password) }
      : updates),
  };
  const user = await userDatabase.updateUserById(userId, updatesWithHash);
  return user;
}

/**
 * Delete a user by id
 * @param userId Id of user to delete
 */
async function deleteUserById(userId: string) {
  userDatabase.deleteUserById(userId);
}

/**
 * Get all cards for a user
 * @param userId Id of user to get cards for
 * @returns All cards for the user or throws an error if user does not exist
 */
async function getAllUserCards(userId: string) {
  const cards = await userDatabase.getAllUserCards(userId);
  return cards;
}

/**
 * Add a card to a user
 * @param userId Id of user to add card to
 * @param cardName Name of card to add
 * @param cardExpiry Expiry date of card to add
 * @param cardIssuer Issuer of card to add
 * @param cardType Type of card to add
 * @returns The updated user, or throws an error if user or card does not exist
 */
async function addUserCard(
  userId: string,
  cardName: string,
  cardExpiry: Date,
  cardIssuer: string,
  cardType: string,
) {
  try {
    const cardToAdd = {
      cardName,
      cardExpiry,
      card: await cardDatabase.getCardId(cardIssuer, cardType),
    };

    const user = await userDatabase.addUserCard(userId, cardToAdd);
    return user;
  } catch (error) {
    if (error instanceof CardNotFoundError) {
      throw new CardNotFoundError(error.message, 422);
    }
    throw error;
  }
}

/**
 * Get a card for a user by name
 * @param userId Id of user to get card for
 * @param cardName Name of card to get
 * @returns The card for the user with the given name, or throws an error if user or card does not exist
 */
async function getUserCardByName(userId: string, cardName: string) {
  const card = await userDatabase.getUserCardByName(userId, cardName);
  return card;
}

/**
 * Update a card for a user by name
 * @param userId Id of user to update card for
 * @param cardName Name of card to update
 * @param updates Updates to apply to card
 * @returns The updated user card, or throws an error if user or card does not exist
 */
async function updateUserCardByName(
  userId: string,
  cardName: string,
  updates: Partial<UserCardRequest>,
) {
  const card = await userDatabase.updateUserCardByName(
    userId,
    cardName,
    updates,
  );
  return card;
}

/**
 * Delete a card for a user by name
 * @param userId Id of user to delete card for
 * @param cardName Name of card to delete
 */
async function deleteUserCardByName(userId: string, cardName: string) {
  userDatabase.deleteUserCardByName(userId, cardName);
}

/**
 * Login a user
 * @param email Email of user to login
 * @param password Password of user to login
 * @returns The logged in user, or throws an error if user does not exist
 */
async function login(email: string, password: string) {
  const passwordHash = await hashPassword(password);
  const user = await userDatabase.login(email, passwordHash);
  return user;
}

/**
 * Recommend a card for a user's transaction
 * @param userId Id of user to recommend card for
 * @param transaction Transaction to recommend card for
 * @returns The recommended card and cashback amount, or throws an error if user does not exist
 */
async function recommendCard(
  userId: string,
  transaction: Pick<Transaction, 'amount' | 'merchant'>,
) {
  try {
    // Get all cards for user
    const userCards = await userDatabase.getAllUserCards(userId);
    if (userCards.length === 0) {
      throw new NoCardsError('User has no cards');
    }

    // Extract mcc from transaction
    const { mcc } = await merchantDatabase.getMerchantById(
      transaction.merchant,
    );

    // Get cashback amount for each card
    const cashbackAmounts = [];
    for (let i = 0; i < userCards.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const { benefits, exclusions, cashbackLimit } =
        // eslint-disable-next-line no-await-in-loop
        await cardDatabase.getCardById(userCards[i].card as string);

      // Check if mcc is in card exclusions
      if ((mcc as number) in exclusions) {
        cashbackAmounts[i] = 0;
        // eslint-disable-next-line no-continue
        continue;
      }

      let cashbackRate = 0;
      // eslint-disable-next-line no-await-in-loop
      const category = await getCategory(mcc as number);

      for (let j = 0; j < benefits.length; j += 1) {
        if (
          benefits[j].mccs.includes(mcc as number) ||
          category.toLowerCase() === benefits[j].category?.toLowerCase()
        ) {
          cashbackRate = benefits[j].cashbackRate as number;
          break;
        }
      }

      const expectedCashback = transaction.amount * (cashbackRate / 100);
      // eslint-disable-next-line no-await-in-loop
      const accumulatedCashback = await transactionDatabase.getUserCardCashback(
        userId,
        userCards[i].cardName as string,
        new Date().getMonth(),
        new Date().getFullYear(),
      );
      if (accumulatedCashback + expectedCashback > (cashbackLimit as number)) {
        cashbackAmounts[i] =
          accumulatedCashback + expectedCashback - (cashbackLimit as number);
      } else {
        cashbackAmounts[i] = transaction.amount * (cashbackRate / 100);
      }
    }

    // Find card with highest cashback amount
    const maxCashback = Math.max(...cashbackAmounts);
    const recommended = {
      card: userCards[cashbackAmounts.indexOf(maxCashback)].cardName,
      cashbackAmount: maxCashback,
    };

    return recommended;
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      throw toApplicationError(error);
    } else {
      throw error;
    }
  }
}

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getAllUserCards,
  addUserCard,
  getUserCardByName,
  updateUserCardByName,
  deleteUserCardByName,
  login,
  recommendCard,
};
