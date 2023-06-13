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
  });

export default router;
