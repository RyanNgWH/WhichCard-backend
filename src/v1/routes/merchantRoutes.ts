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
  );
//   /**
//    * Update a merchant by id
//    * PATCH /api/v1/merchants/:merchantId
//    * @param req PATCH request for merchant by id
//    * @param res Response to send back
//    */
//   .patch(
//     merchantController.validate('updatemerchantById'),
//     (req: Request, res: Response) => {
//       merchantController.updatemerchantById(req, res);
//     },
//   )
//   /**
//    * Delete a merchant by id
//    * DELETE /api/v1/merchants/:merchantId
//    * @param req DELETE request for merchant by id
//    * @param res Response to send back
//    */
//   .delete(
//     merchantController.validate('deletemerchantById'),
//     (req: Request, res: Response) => {
//       merchantController.deletemerchantById(req, res);
//     },
//   );

// // Methods for merchant cards
// router
//   .route('/:merchantId/cards')
//   /**
//    * Get all Cards for a merchant
//    * GET /api/v1/merchants/:merchantId/cards
//    * @param req GET request for all cards for a merchant
//    * @param res Response to send back
//    */
//   .get(
//     merchantController.validate('getAllmerchantCards'),
//     (req: Request, res: Response) => {
//       merchantController.getAllmerchantCards(req, res);
//     },
//   )
//   /**
//    * Add a Card to a merchant
//    * POST /api/v1/merchants/:merchantId/cards
//    * @param req POST request for adding a card to a merchant
//    * @param res Response to send back
//    */
//   .post(
//     merchantController.validate('addmerchantCard'),
//     (req: Request, res: Response) => {
//       merchantController.addmerchantCard(req, res);
//     },
//   );

// // Methods for specific merchant card
// router
//   .route('/:merchantId/cards/:cardName')
//   /**
//    * Get a specific card for a merchant by name
//    * GET /api/v1/merchants/:merchantId/cards/:cardName
//    * @param req GET request for a specific card for a merchant by name
//    * @param res Response to send back
//    */
//   .get(
//     merchantController.validate('getmerchantCardByName'),
//     (req: Request, res: Response) => {
//       merchantController.getmerchantCardByName(req, res);
//     },
//   )
//   /**
//    * Update a specific card for a merchant by name
//    * PATCH /api/v1/merchants/:merchantId/cards/:cardName
//    * @param req PATCH request for a specific card for a merchant by name
//    * @param res Response to send back
//    */
//   .patch(
//     merchantController.validate('updatemerchantCardByName'),
//     (req: Request, res: Response) => {
//       merchantController.updatemerchantCardByName(req, res);
//     },
//   )
//   /**
//    * Delete a specific card for a merchant by name
//    * DELETE /api/v1/merchants/:merchantId/cards/:cardName
//    * @param req DELETE request for a specific card for a merchant by name
//    * @param res Response to send back
//    */
//   .delete(
//     merchantController.validate('deletemerchantCardByName'),
//     (req: Request, res: Response) => {
//       merchantController.deletemerchantCardByName(req, res);
//     },
//   );

// // Methods for logging in
// router
//   .route('/login')
//   /**
//    * Login a merchant
//    * POST /api/v1/merchants/login
//    */
//   .post(merchantController.validate('login'), (req: Request, res: Response) => {
//     merchantController.login(req, res);
//   });

export default router;
