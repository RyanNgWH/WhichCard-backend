/**
 * Controller methods for card management
 *
 * @format
 */

import { Request, Response } from 'express';
import toApplicationError from '../shared/errors/errorHelpers';
import * as cardService from '../services/cardService';

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

export { getAllCards };
