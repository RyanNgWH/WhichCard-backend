/**
 * Controller methods for user management
 *
 * @format
 */

import { Request, Response } from 'express';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import * as userService from '../services/userService';
import toApplicationError from '../shared/errors/errorHelpers';
import {
  cardArrayExpirySchema,
  cardArrayIdSchema,
  cardArrayNameScema,
  cardExpirySchema,
  cardNameSchema,
  cardsArraySchema,
  emailSchema,
  nameSchema,
  newPasswordSchema,
  passwordSchema,
  userIdSchema,
} from '../shared/schemas/userSchemas';
import { createSchema } from '../shared/schemas/schemas';
import { issuerSchema, typeSchema } from '../shared/schemas/cardSchemas';

/**
 * Get all users
 * @param req GET request for all users
 * @param res Status code 200 and all users in database
 */
async function getAllUsers(req: Request, res: Response) {
  try {
    const allUsers = await userService.getAllUsers();
    res.send({ status: 'OK', data: allUsers });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Get a user by id
 * @param req GET request for user by id
 * @param res Status code 200 and user with given id or 404 if user does not exist
 */
async function getUserById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract userId from request parameters
  const { userId } = req.params;

  try {
    // Pass userId to service to get user from database
    const user = await userService.getUserById(userId);
    res.send({ status: 'OK', data: user });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Create a new user
 * @param req POST request for new user
 * @param res Status code 201 and created user or 422 if user already exists
 */
async function createUser(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract body from verified request
  const body = matchedData(req, { locations: ['body'] });

  // Create new user
  const newUser = {
    name: body.name,
    email: body.email,
    password: body.password,
    cards: body.cards,
  };

  try {
    // Pass new user to service to save user to database
    const createdUser = await userService.createUser(newUser);
    res.status(201).send({ status: 'Created', data: createdUser });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Update a user by id
 * @param req PATCH request for user by id
 * @param res Status code 200 and updated user or 404 if user does not exist
 */
async function updateUserById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract body and userId from verified request/request parameters
  const params = matchedData(req, { locations: ['params'] });
  const body = matchedData(req, { locations: ['body'] });

  try {
    // Pass userId and updates to service to update user in database
    const updatedUser = await userService.updateUserById(params.userId, body);
    res.send({ status: 'OK', data: updatedUser });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Delete a user by id
 * @param req DELETE request for user by id
 * @param res Status code 204 and empty body
 */
async function deleteUserById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract parameters from request parameters
  const params = matchedData(req, { locations: ['params'] });

  try {
    // Pass userId to service to delete user from database
    await userService.deleteUserById(params.userId);
    res.status(204).send();
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Get all cards for a user
 * @param req GET request for all cards for a user
 * @param res Status code 200 and all cards for a user or 404 if user does not exist
 */
async function getAllUserCards(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract userId from validated request parameters
  const { userId } = matchedData(req, { locations: ['params'] });

  try {
    // Pass userId to service to get all cards for a user from database
    const cards = await userService.getAllUserCards(userId);
    res.send({ status: 'OK', data: cards });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Add a card to a user
 * @param req POST request for adding a card to a user
 * @param res Status code 200 and updated user or 404 if user does not exist
 */
async function addUserCard(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract userId and body from validated request
  const { userId } = matchedData(req, { locations: ['params'] });
  const { type, issuer, cardName, cardExpiry } = matchedData(req, {
    locations: ['body'],
  });

  try {
    // Pass userId and card details to service to add card to user in database
    const updatedUser = await userService.addUserCard(
      userId,
      cardName,
      cardExpiry,
      issuer,
      type,
    );
    res.send({ status: 'OK', data: updatedUser });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Get a card for a user by name
 * @param req GET request for a card for a user by name
 * @param res Status code 200 and card for a user or 404 if user or card does not exist
 */
async function getUserCardByName(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract userId and cardName from validated request parameters
  const { userId, cardName } = matchedData(req, { locations: ['params'] });

  try {
    // Pass userId and cardName to service to get card for a user from database
    const card = await userService.getUserCardByName(userId, cardName);
    res.send({ status: 'OK', data: card });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Update a card for a user by name
 * @param req PUT request for updating a card for a user by name
 * @param res Status code 200 and updated card or 404 if user or card does not exist
 */
async function updateUserCardByName(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract userId, cardName and body from validated request
  const { userId, cardName } = matchedData(req, { locations: ['params'] });
  const body = matchedData(req, { locations: ['body'] });

  // Check that body must contain both type and issuer or neither
  if (body.type || body.issuer) {
    if (!body.type || !body.issuer) {
      res.status(400).send({
        status: 'Bad Request',
        errors: [
          {
            type: 'field',
            value: body,
            msg: 'If updating type or issuer, both must be provided',
            param: 'issuer/type',
            location: 'body',
          },
        ],
      });
      return;
    }
  }

  try {
    // Pass userId, cardName and card details to service to update card for a user in database
    const updatedCard = await userService.updateUserCardByName(
      userId,
      cardName,
      body,
    );
    res.send({ status: 'OK', data: updatedCard });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Delete a card for a user by name
 * @param req DELETE request for deleting a card for a user by name
 * @param res Status code 204 and empty body or 404 if user does not exist
 */
async function deleteUserCardByName(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract userId and cardName from validated request parameters
  const { userId, cardName } = matchedData(req, { locations: ['params'] });

  try {
    // Pass userId and cardName to service to delete card for a user from database
    await userService.deleteUserCardByName(userId, cardName);
    res.status(204).send();
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Login a user
 * @param req POST request for user login
 * @param res Response to send back (200 with user data or 401)
 */
async function login(req: Request, res: Response) {
  // TODO: Implement JWT authentication?

  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract request body
  const body = matchedData(req, { locations: ['body'] });

  try {
    // Pass email and password to service to login user
    const user = await userService.login(body.email, body.password);
    res.send({ status: 'OK', data: user });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Validate request body
 * @param method Method to validate
 * @returns Array of validation chains
 */
function validate(method: String) {
  switch (method) {
    case 'createUser':
      return checkSchema(
        createSchema([
          { fieldSchema: nameSchema, optional: false, in: ['body'] },
          { fieldSchema: emailSchema, optional: false, in: ['body'] },
          { fieldSchema: newPasswordSchema, optional: false, in: ['body'] },
          { fieldSchema: cardArrayNameScema, optional: true, in: ['body'] },
          { fieldSchema: cardArrayExpirySchema, optional: true, in: ['body'] },
          { fieldSchema: cardsArraySchema, optional: true, in: ['body'] },
          { fieldSchema: cardArrayIdSchema, optional: true, in: ['body'] },
        ]),
      );
    case 'getUserById':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['params'] },
        ]),
      );
    case 'updateUserById':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['params'] },
          { fieldSchema: nameSchema, optional: true, in: ['body'] },
          // TODO: Decide if email should be updatable
          // { fieldSchema: emailSchema, optional: true, in: ['body'] },
          { fieldSchema: newPasswordSchema, optional: true, in: ['body'] },
        ]),
      );
    case 'deleteUserById':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['params'] },
        ]),
      );
    case 'getAllUserCards':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['params'] },
        ]),
      );
    case 'addUserCard':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['params'] },
          { fieldSchema: typeSchema, optional: false, in: ['body'] },
          { fieldSchema: issuerSchema, optional: false, in: ['body'] },
          { fieldSchema: cardNameSchema, optional: false, in: ['body'] },
          { fieldSchema: cardExpirySchema, optional: false, in: ['body'] },
        ]),
      );
    case 'getUserCardByName':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['params'] },
          { fieldSchema: cardNameSchema, optional: false, in: ['params'] },
        ]),
      );
    case 'updateUserCardByName':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['params'] },
          {
            fieldSchema: cardNameSchema,
            optional: false,
            in: ['params', 'body'],
          },
          { fieldSchema: typeSchema, optional: true, in: ['body'] },
          { fieldSchema: issuerSchema, optional: true, in: ['body'] },
          { fieldSchema: cardExpirySchema, optional: true, in: ['body'] },
        ]),
      );
    case 'login':
      return checkSchema(
        createSchema([
          { fieldSchema: emailSchema, optional: false, in: ['body'] },
          { fieldSchema: passwordSchema, optional: false, in: ['body'] },
        ]),
      );
    case 'deleteUserCardByName':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['params'] },
          { fieldSchema: cardNameSchema, optional: false, in: ['params'] },
        ]),
      );
    default:
      return [];
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
  validate,
};
