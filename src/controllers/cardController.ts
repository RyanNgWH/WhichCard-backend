/**
 * Controller methods for card management
 *
 * @format
 */

import { Request, Response } from 'express';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import toApplicationError from '../shared/errors/errorHelpers';
import * as cardService from '../services/cardService';
import { createSchema } from '../shared/schemas/schemas';
import {
  benefitsCashbackSchema,
  benefitsCategorySchema,
  benefitsMccsSchema,
  benefitsSchema,
  cardIdSchema,
  cashbackLimitSchema,
  exclusionsSchema,
  issuerSchema,
  minimumSpendSchema,
  typeSchema,
} from '../shared/schemas/cardSchemas';

/**
 * Get all cards
 * @param req GET request for all cards
 * @param res Status code 200 and all cards in database
 */
async function getAllCards(req: Request, res: Response) {
  try {
    const allCards = await cardService.getAllCards();
    res.send({ status: 'OK', data: allCards });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Get a card by id
 * @param req GET request for card by id
 * @param res Status code 200 and card with given id or 404 if card does not exist
 */
async function getCardById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract card id from validated request parameters
  const { cardId } = matchedData(req, { locations: ['params'] });

  try {
    // Pass cardId to service to get card from database
    const card = await cardService.getCardById(cardId);
    res.send({ status: 'OK', data: card });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Create a card
 * @param req POST request for creating a card
 * @param res Status code 201 and created card or error message if card could not be created
 */
async function createCard(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract body from verified request body
  const body = matchedData(req, { locations: ['body'] });

  // Create new card
  const newCard = {
    type: body.type,
    issuer: body.issuer,
    benefits: body.benefits,
    exclusions: body.exclusions,
    cashbackLimit: body.cashbackLimit,
    minimumSpend: body.minimumSpend,
  };

  try {
    // Pass body to service to create card in database
    const createdCard = await cardService.createCard(newCard);
    res.status(201).send({ status: 'Created', data: createdCard });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Update a card by id
 * @param req PATCH request for updating a card by id
 * @param res Status code 200 and updated card or error message if card could not be updated
 */
async function updateCardById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract card id and body from validated request parameters and body
  const { cardId } = matchedData(req, { locations: ['params'] });
  const body = matchedData(req, { locations: ['body'] });

  try {
    // Pass cardId and body to service to update card in database
    const updatedCard = await cardService.updateCardById(cardId, body);
    res.send({ status: 'OK', data: updatedCard });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Delete a card by id
 * @param req DELETE request for deleting a card by id
 * @param res Status code 200 and deleted card or error message if card could not be deleted
 */
async function deleteCardById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract card id from validated request parameters
  const { cardId } = matchedData(req, { locations: ['params'] });

  try {
    // Pass cardId to service to delete card from database
    await cardService.deleteCardById(cardId);
    res.status(204).send();
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
function validate(method: string) {
  switch (method) {
    case 'createCard':
      return checkSchema(
        createSchema([
          { fieldSchema: typeSchema, optional: false, in: ['body'] },
          { fieldSchema: issuerSchema, optional: false, in: ['body'] },
          { fieldSchema: benefitsSchema, optional: true, in: ['body'] },
          { fieldSchema: benefitsCategorySchema, optional: true, in: ['body'] },
          { fieldSchema: benefitsMccsSchema, optional: true, in: ['body'] },
          { fieldSchema: benefitsCashbackSchema, optional: true, in: ['body'] },
          { fieldSchema: exclusionsSchema, optional: true, in: ['body'] },
          { fieldSchema: cashbackLimitSchema, optional: true, in: ['body'] },
          { fieldSchema: minimumSpendSchema, optional: true, in: ['body'] },
        ]),
      );
    case 'getCardById':
      return checkSchema(
        createSchema([
          { fieldSchema: cardIdSchema, optional: false, in: ['params'] },
        ]),
      );
    case 'updateCardById':
      return checkSchema(
        createSchema([
          { fieldSchema: cardIdSchema, optional: false, in: ['params'] },
          { fieldSchema: typeSchema, optional: true, in: ['body'] },
          { fieldSchema: issuerSchema, optional: true, in: ['body'] },
          { fieldSchema: benefitsSchema, optional: true, in: ['body'] },
          { fieldSchema: benefitsCategorySchema, optional: true, in: ['body'] },
          { fieldSchema: benefitsMccsSchema, optional: true, in: ['body'] },
          { fieldSchema: benefitsCashbackSchema, optional: true, in: ['body'] },
          { fieldSchema: exclusionsSchema, optional: true, in: ['body'] },
          { fieldSchema: cashbackLimitSchema, optional: true, in: ['body'] },
          { fieldSchema: minimumSpendSchema, optional: true, in: ['body'] },
        ]),
      );
    case 'deleteCardById':
      return checkSchema(
        createSchema([
          { fieldSchema: cardIdSchema, optional: false, in: ['params'] },
        ]),
      );
    default:
      return [];
  }
}

export {
  getAllCards,
  getCardById,
  createCard,
  updateCardById,
  deleteCardById,
  validate,
};
