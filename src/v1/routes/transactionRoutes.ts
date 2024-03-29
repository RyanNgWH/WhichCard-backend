/**
 * Routes for transaction management
 *
 * @format
 */

import express, { Request, Response } from 'express';
import * as transactionController from '../../controllers/transactionController';

const router = express.Router();

// TODO: Implement validation for invalid routes

// Methods for all transactions
router
  .route('/')
  /**
   * Get all transactions
   * GET /api/v1/transactions
   * @param req GET request for all transaction
   * @param res Response to send back
   */
  .get((req: Request, res: Response) => {
    transactionController.getAlltransactions(req, res);
  })
  /**
   * Create a new transaction
   * POST /api/v1/transactions
   * @param req POST request for a new transaction
   * @param res Response to send back
   */
  .post(
    transactionController.validate('createTransaction'),
    (req: Request, res: Response) => {
      transactionController.createTransaction(req, res);
    },
  );

// Methods for specific transaction
router
  .route('/:transactionId')
  /**
   * Get a transaction by id
   * GET /api/v1/transactions/:transactionId
   * @param req GET request for transaction by id
   * @param res Response to send back
   */
  .get(
    transactionController.validate('getTransactionById'),
    (req: Request, res: Response) => {
      transactionController.getTransactionById(req, res);
    },
  )
  /**
   * Update a transaction by id
   * PATCH /api/v1/transactions/:transactionId
   * @param req PATCH request for transaction by id
   * @param res Response to send back
   */
  .patch(
    transactionController.validate('updateTransactionById'),
    (req: Request, res: Response) => {
      transactionController.updateTransactionById(req, res);
    },
  )
  /**
   * Delete a transaction by id
   * DELETE /api/v1/transactions/:transactionId
   * @param req DELETE request for transaction by id
   * @param res Response to send back
   */
  .delete(
    transactionController.validate('deleteTransactionById'),
    (req: Request, res: Response) => {
      transactionController.deleteTransactionById(req, res);
    },
  );

export default router;
