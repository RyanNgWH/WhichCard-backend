/**
 * Database methods for user management
 *
 * @format
 */

import { User } from '../shared/types';
import UserExistsError from '../shared/errors/database/user/userExistsError';
import UserNotFoundError from '../shared/errors/database/user/userNotFoundError';
import IncorrectCredentialsError from '../shared/errors/user/incorrectPasswordError';
import UserModel from './models/userModels';
import DatabaseError from '../shared/errors/database/databaseError';
import toApplicationError from '../shared/errors/errorHelpers';
import CardExistsError from '../shared/errors/database/card/cardExistsError';
import CardNotFoundError from '../shared/errors/database/card/cardNotFoundError';

/**
 * Return all users in database
 * @returns All users in database
 */
async function getAllUsers() {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    const appError = toApplicationError(error);
    throw new DatabaseError(appError.message, appError.code);
  }
}

/**
 * Get a user by id
 * @param userId Id of user to get
 * @returns The user with the given id, or throws an error if user does not exist
 */
async function getUserById(userId: string) {
  try {
    // Find user with matching id from database
    const user = await UserModel.findById(userId);

    // Check if user exists
    if (!user) {
      throw new UserNotFoundError(`User with id ${userId} not found.`);
    }

    return user;
  } catch (error) {
    const appError = toApplicationError(error);
    throw new DatabaseError(appError.message, appError.code);
  }
}

/**
 * Create a new user and save to database
 * @param newUser User to create
 * @returns The created user, or throws an error if user already exists
 */
async function createUser(newUser: User) {
  try {
    // Check if user already exists in database (using email as unique identifier)
    if (await UserModel.exists({ email: newUser.email })) {
      throw new UserExistsError(
        `User with email ${newUser.email} already exists.`,
      );
    }

    const createdUser = await UserModel.create(newUser);
    return createdUser;
  } catch (error) {
    const appError = toApplicationError(error);
    throw new DatabaseError(appError.message, appError.code);
  }
}

/**
 * Update a user by id
 * @param userId Id of user to update
 * @param updates Updates to apply to user
 * @returns The updated user, or throws an error if user does not exist
 */
async function updateUserById(userId: string, updates: Partial<User>) {
  try {
    // Find the user to update
    const user = await UserModel.findById(userId);

    // Check if user exists
    if (!user) {
      throw new UserNotFoundError(`User with id ${userId} not found.`);
    }

    // Check if email is being updated
    if (updates.email) {
      // Check if email already exists in database
      const userWithEmail = await UserModel.findOne({ email: updates.email });
      if (userWithEmail) {
        throw new UserExistsError(
          `The email ${updates.email} is already in use.`,
        );
      }
    }

    // Update user with new values
    user.set(updates);
    user.updatedAt = new Date().getTime();

    // Save updated user to database
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    // TODO: Implement logging
    const appError = toApplicationError(error);
    throw new DatabaseError(appError.message, appError.code);
  }
}

/**
 * Delete a user by id
 * @param userId Id of user to delete
 */
async function deleteUserById(userId: string) {
  UserModel.findByIdAndDelete(userId).catch(error => {
    // TODO: Implement logging
    const appError = toApplicationError(error);
    throw new DatabaseError(appError.message, appError.code);
  });
}

/**
 * Get a user's cards
 * @param userId Id of user to get cards for
 * @returns The user's cards, or throws an error if user does not exist
 */
async function getAllUserCards(userId: string) {
  try {
    // Find the user to get cards for
    const user = await UserModel.findById(userId).populate('cards.card');

    // Check if user exists
    if (!user) {
      throw new UserNotFoundError(`User with id ${userId} not found.`);
    }

    // Return user's cards
    return user.cards;
  } catch (error) {
    const appError = toApplicationError(error);
    throw new DatabaseError(appError.message, appError.code);
  }
}

/**
 * Add a card to a user's cards
 * @param userId Id of user to add card to
 * @param card Card to add
 * @returns The updated user, or throws an error if user does not exist
 */
async function addUserCard(userId: string, card: User['cards'][number]) {
  try {
    // Find the user to update
    const user = await UserModel.findById(userId);

    // Check if user exists
    if (!user) {
      throw new UserNotFoundError(`User with id ${userId} not found.`);
    }

    if (
      user.cards.find(
        userCard =>
          userCard.cardName?.toLowerCase() === card.cardName.toLowerCase(),
      )
    ) {
      throw new CardExistsError(
        `Card with name '${card.cardName}' already exists in user's cards.`,
      );
    }

    // Add card to user's cards
    user.cards.push(card);

    // Save updated user to database
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    const appError = toApplicationError(error);
    throw new DatabaseError(appError.message, appError.code);
  }
}

/**
 * Get a user card by name
 * @param userId Id of user to get card for
 * @param cardName Name of card to get
 * @returns The user's card, or throws an error if user or card does not exist
 */
async function getUserCardByName(userId: string, cardName: string) {
  try {
    // Find the user to get card for
    const user = await UserModel.findById(userId).populate('cards.card');

    // Check if user exists
    if (!user) {
      throw new UserNotFoundError(`User with id '${userId}' not found.`);
    }

    // Find the user's card
    const userCard = user.cards.find(
      card => card.cardName?.toLowerCase() === cardName.toLowerCase(),
    );

    // Check if user's card exists
    if (!userCard) {
      throw new CardNotFoundError(
        `User with id '${userId}' has no card with name '${cardName}'.`,
      );
    }

    // Return user's card
    return userCard;
  } catch (error) {
    const appError = toApplicationError(error);
    throw new DatabaseError(appError.message, appError.code);
  }
}

/**
 * Login a user
 * @param email User email
 * @param password User password
 * @returns The logged in user, or undefined if user does not exist or password is incorrect
 */
async function login(email: string, password: string) {
  try {
    // Find user with matching email
    const user = await UserModel.findOne({ email });

    // Check if user exists and password is correct
    if (!user || user.password !== password) {
      throw new IncorrectCredentialsError('Incorrect credentials.');
    }

    return user;
  } catch (error) {
    const appError = toApplicationError(error);
    throw new DatabaseError(appError.message, appError.code);
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
  login,
};
