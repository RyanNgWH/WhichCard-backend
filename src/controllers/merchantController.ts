/**
 * Controller methods for merchant management
 *
 * @format
 */

import { Request, Response } from 'express';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import * as merchantService from '../services/merchantService';
import toApplicationError from '../shared/errors/errorHelpers';
import { createSchema } from '../shared/schemas/schemas';
import {
  addressSchema,
  latitudeSchema,
  longitudeSchema,
  mccSchema,
  merchantIdSchema,
  nameSchema,
  prettyNameSchema,
} from '../shared/schemas/merchantSchemas';

/**
 * Get all merchants
 * @param req GET request for all merchants
 * @param res Status code 200 and all merchants in database
 */
async function getAllMerchants(req: Request, res: Response) {
  try {
    const allMerchants = await merchantService.getAllMerchants();
    res.send({ status: 'OK', data: allMerchants });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Create a new merchant
 * @param req POST request for new merchant
 * @param res Status code 201 and created merchant or 422 if merchant already exists
 */
async function createMerchant(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract body from verified request
  const body = matchedData(req, { locations: ['body'] });

  // Create new merchant
  const newMerchant = {
    name: body.name,
    prettyName: body.prettyName,
    address: body.address,
    mcc: body.mcc,
    longitude: body.longitude,
    latitude: body.latitude,
  };

  try {
    // Pass new merchant to service to save merchant to database
    const createdMerchant = await merchantService.createMerchant(newMerchant);
    res.status(201).send({ status: 'Created', data: createdMerchant });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Get a merchant by id
 * @param req GET request for merchant by id
 * @param res Status code 200 and merchant with given id or 404 if merchant does not exist
 */
async function getMerchantById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract merchantId from request parameters
  const { merchantId } = req.params;

  try {
    // Pass merchantId to service to get merchant from database
    const merchant = await merchantService.getMerchantById(merchantId);
    res.send({ status: 'OK', data: merchant });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Update a merchant by id
 * @param req PATCH request for updating a merchant by id
 * @param res Status code 200 and updated merchant or error message if merchant could not be updated
 */
async function updateMerchantById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract merchant id and body from validated request parameters and body
  const { merchantId } = matchedData(req, { locations: ['params'] });
  const body = matchedData(req, { locations: ['body'] });

  try {
    // Pass merchantId and body to service to update merchant in database
    const updatedMerchant = await merchantService.updateMerchantById(
      merchantId,
      body,
    );
    res.send({ status: 'OK', data: updatedMerchant });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Delete a merchant by id
 * @param req DELETE request for deleting a merchant by id
 * @param res Status code 200 and deleted merchant or error message if merchant could not be deleted
 */
async function deleteMerchantById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract merchant id from validated request parameters
  const { merchantId } = matchedData(req, { locations: ['params'] });

  try {
    // Pass merchantId to service to delete merchant from database
    await merchantService.deleteMerchantById(merchantId);
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
function validate(method: String) {
  switch (method) {
    case 'createMerchant':
      return checkSchema(
        createSchema([
          { fieldSchema: nameSchema, optional: false, in: ['body'] },
          { fieldSchema: prettyNameSchema, optional: false, in: ['body'] },
          { fieldSchema: addressSchema, optional: false, in: ['body'] },
          { fieldSchema: mccSchema, optional: false, in: ['body'] },
          { fieldSchema: longitudeSchema, optional: false, in: ['body'] },
          { fieldSchema: latitudeSchema, optional: false, in: ['body'] },
        ]),
      );
    case 'getMerchantById':
      return checkSchema(
        createSchema([
          { fieldSchema: merchantIdSchema, optional: false, in: ['params'] },
        ]),
      );
    case 'updateMerchantById':
      return checkSchema(
        createSchema([
          { fieldSchema: merchantIdSchema, optional: false, in: ['params'] },
          { fieldSchema: nameSchema, optional: true, in: ['body'] },
          { fieldSchema: prettyNameSchema, optional: true, in: ['body'] },
          { fieldSchema: addressSchema, optional: true, in: ['body'] },
          { fieldSchema: mccSchema, optional: true, in: ['body'] },
          { fieldSchema: longitudeSchema, optional: true, in: ['body'] },
          { fieldSchema: latitudeSchema, optional: true, in: ['body'] },
        ]),
      );
    case 'deleteMerchantById':
      return checkSchema(
        createSchema([
          { fieldSchema: merchantIdSchema, optional: false, in: ['params'] },
        ]),
      );
    // case 'getAllmerchantmerchants':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: merchantIdSchema, optional: false, in: ['params'] },
    //     ]),
    //   );
    // case 'addmerchantmerchant':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: merchantIdSchema, optional: false, in: ['params'] },
    //       { fieldSchema: typeSchema, optional: false, in: ['body'] },
    //       { fieldSchema: issuerSchema, optional: false, in: ['body'] },
    //       { fieldSchema: merchantNameSchema, optional: false, in: ['body'] },
    //       { fieldSchema: merchantExpirySchema, optional: false, in: ['body'] },
    //     ]),
    //   );
    // case 'getmerchantmerchantByName':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: merchantIdSchema, optional: false, in: ['params'] },
    //       { fieldSchema: merchantNameSchema, optional: false, in: ['params'] },
    //     ]),
    //   );
    // case 'updatemerchantmerchantByName':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: merchantIdSchema, optional: false, in: ['params'] },
    //       {
    //         fieldSchema: merchantNameSchema,
    //         optional: false,
    //         in: ['params', 'body'],
    //       },
    //       { fieldSchema: typeSchema, optional: true, in: ['body'] },
    //       { fieldSchema: issuerSchema, optional: true, in: ['body'] },
    //       { fieldSchema: merchantExpirySchema, optional: true, in: ['body'] },
    //     ]),
    //   );
    // case 'login':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: emailSchema, optional: false, in: ['body'] },
    //       { fieldSchema: passwordSchema, optional: false, in: ['body'] },
    //     ]),
    //   );
    // case 'deletemerchantmerchantByName':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: merchantIdSchema, optional: false, in: ['params'] },
    //       { fieldSchema: merchantNameSchema, optional: false, in: ['params'] },
    //     ]),
    //   );
    default:
      return [];
  }
}

export {
  getAllMerchants,
  validate,
  createMerchant,
  getMerchantById,
  updateMerchantById,
  deleteMerchantById,
};
