/**
 * Routes for card management
 *
 * @format
 */

import express, { Request, Response } from 'express';
import * as cardController from '../../controllers/cardController';

const router = express.Router();

// Methods for all cards
router
  .route('/')
  /**
   * Get all Cards
   * GET /api/v1/cards
   * @param req GET request for all cards
   * @param res Response to send back
   */
  .get((req: Request, res: Response) => {
    cardController.getAllCards(req, res);
  })
  /**
   * Create a new Card
   * POST /api/v1/cards
   * @param req POST request for new card
   * @param res Response to send back
   */
  .post(
    cardController.validate('createCard'),
    (req: Request, res: Response) => {
      cardController.createCard(req, res);
    },
  );

// Methods for a specific card
router
  .route('/:cardId')
  /**
   * Get a Card by id
   * GET /api/v1/cards/:cardId
   * @param req GET request for card by id
   * @param res Response to send back
   */
  .get(
    cardController.validate('getCardById'),
    (req: Request, res: Response) => {
      cardController.getCardById(req, res);
    },
  );

export default router;
