/**
 * Database methods for user management
 *
 * @format
 */

import { User, UserCardRequest } from '../shared/types';
import UserExistsError from '../shared/errors/database/user/userExistsError';
import UserNotFoundError from '../shared/errors/database/user/userNotFoundError';
import IncorrectCredentialsError from '../shared/errors/user/incorrectPasswordError';
import UserModel from './models/userModels';
import DatabaseError from '../shared/errors/database/databaseError';
import toApplicationError from '../shared/errors/errorHelpers';
import CardExistsError from '../shared/errors/database/card/cardExistsError';
import CardNotFoundError from '../shared/errors/database/card/cardNotFoundError';
import { getCardId } from './cardDatabase';
import ApplicationError from '../shared/errors/application/applicationError';

/**
 * Return all users in database
 * @returns All users in database
 */
async function getAllUsers() {
  try {
    const users = await UserModel.find();
    return users;
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
      throw new UserNotFoundError(`User with id '${userId}' not found.`);
    }

    return user;
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
 * Create a new user and save to database
 * @param newUser User to create
 * @returns The created user, or throws an error if user already exists
 */
async function createUser(newUser: User) {
  try {
    // Check if user already exists in database (using email as unique identifier)
    if (await UserModel.exists({ email: newUser.email })) {
      throw new UserExistsError(
        `User with email '${newUser.email}' already exists.`,
      );
    }

    const createdUser = await UserModel.create(newUser);
    return createdUser;
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
      throw new UserNotFoundError(`User with id '${userId}' not found.`);
    }

    // Check if email is being updated
    if (updates.email) {
      // Check if email already exists in database
      const userWithEmail = await UserModel.findOne({ email: updates.email });
      if (userWithEmail) {
        throw new UserExistsError(
          `The email '${updates.email}' is already in use.`,
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
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
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
      throw new UserNotFoundError(`User with id '${userId}' not found.`);
    }

    // Return user's cards
    return user.cards;
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
      throw new UserNotFoundError(`User with id '${userId}' not found.`);
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
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
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
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

/**
 * Update a user card by name
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
  try {
    // Find the user to update
    const user = await UserModel.findById(userId);

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

    // Update user's card with new values
    if (updates.cardName) {
      // Check if card name already exists in user's cards
      const userCardWithName = user.cards.find(
        card =>
          card.cardName?.toLowerCase() === updates.cardName?.toLowerCase(),
      );
      if (userCardWithName) {
        throw new CardExistsError(
          `User with id '${userId}' already has a card with name '${updates.cardName}'.`,
        );
      }

      // Update card name
      userCard.cardName = updates.cardName;
    }

    if (updates.cardExpiry) {
      // Update card expiry
      userCard.cardExpiry = updates.cardExpiry;
    }

    if (updates.issuer && updates.type) {
      // Update card issuer and type
      try {
        userCard.card = await getCardId(updates.issuer, updates.type);
      } catch (error) {
        if (error instanceof CardNotFoundError) {
          throw new CardNotFoundError(error.message, 422);
        }
        throw error;
      }
    }

    // Update last updated date
    user.updatedAt = new Date().getTime();

    // Save updated user to database
    await user.save();
    return userCard;
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
 * Delete a user card by name
 * @param userId Id of user to delete card for
 * @param cardName Name of card to delete
 */
async function deleteUserCardByName(userId: string, cardName: string) {
  try {
    // Find the user to delete card for
    const user = await UserModel.findById(userId);

    // Check if user exists
    if (!user) {
      throw new UserNotFoundError(`User with id '${userId}' not found.`);
    }

    // Find the user's card
    const cardIndex = user.cards.findIndex(
      card => card.cardName?.toLowerCase() === cardName.toLowerCase(),
    );

    // Check if user's card exists
    if (cardIndex !== -1) {
      // Delete user's card
      user.cards.splice(cardIndex, 1);

      // Update last updated date
      user.updatedAt = new Date().getTime();

      // Save updated user to database
      await user.save();
    }
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
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
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
};
