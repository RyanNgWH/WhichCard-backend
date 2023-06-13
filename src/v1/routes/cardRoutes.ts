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

export default router;
