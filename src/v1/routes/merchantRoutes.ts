/**
 * Routes for merchant management
 *
 * @format
 */

import express, { Request, Response } from 'express';
import * as merchantController from '../../controllers/merchantController';

const router = express.Router();

// TODO: Implement validation for invalid routes

// Methods for all merchants
router
  .route('/')
  /**
   * Get all merchants
   * GET /api/v1/merchants
   * @param req GET request for all merchant
   * @param res Response to send back
   */
  .get((req: Request, res: Response) => {
    merchantController.getAllMerchants(req, res);
  })
  /**
   * Create a new Merchant
   * POST /api/v1/merchants
   * @param req POST request for new merchant
   * @param res Response to send back
   */
  .post(
    merchantController.validate('createMerchant'),
    (req: Request, res: Response) => {
      merchantController.createMerchant(req, res);
    },
  );

// Methods for active merchants
router
  .route('/active')
  /**
   * Get all active merchants
   * GET /api/v1/merchants/active
   * @param req GET request for all active merchants
   * @param res Response to send back
   */
  .get((req: Request, res: Response) => {
    merchantController.getAllActiveMerchants(req, res);
  });

// Methods for specific merchant
router
  .route('/:merchantId')
  /**
   * Get a Merchant by id
   * GET /api/v1/merchants/:merchantId
   * @param req GET request for merchant by id
   * @param res Response to send back
   */
  .get(
    merchantController.validate('getMerchantById'),
    (req: Request, res: Response) => {
      merchantController.getMerchantById(req, res);
    },
  )
  /**
   * Update a merchant by id
   * PATCH /api/v1/merchants/:merchantId
   * @param req PATCH request for merchant by id
   * @param res Response to send back
   */
  .patch(
    merchantController.validate('updateMerchantById'),
    (req: Request, res: Response) => {
      merchantController.updateMerchantById(req, res);
    },
  )
  /**
   * Delete a merchant by id
   * DELETE /api/v1/merchants/:merchantId
   * @param req DELETE request for merchant by id
   * @param res Response to send back
   */
  .delete(
    merchantController.validate('deleteMerchantById'),
    (req: Request, res: Response) => {
      merchantController.deleteMerchantById(req, res);
    },
  );

export default router;
