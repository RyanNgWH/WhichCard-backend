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
  nameSchema,
  prettyNameSchema,
} from '../shared/schemas/merchantSchemas';

/**
 * Get all merchants
 * @param req GET request for all users
 * @param res Status code 200 and all users in database
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
    // case 'getUserById':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: userIdSchema, optional: false, in: ['params'] },
    //     ]),
    //   );
    // case 'updateUserById':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: userIdSchema, optional: false, in: ['params'] },
    //       { fieldSchema: nameSchema, optional: true, in: ['body'] },
    //       // TODO: Decide if email should be updatable
    //       // { fieldSchema: emailSchema, optional: true, in: ['body'] },
    //       { fieldSchema: newPasswordSchema, optional: true, in: ['body'] },
    //     ]),
    //   );
    // case 'deleteUserById':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: userIdSchema, optional: false, in: ['params'] },
    //     ]),
    //   );
    // case 'getAllUserCards':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: userIdSchema, optional: false, in: ['params'] },
    //     ]),
    //   );
    // case 'addUserCard':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: userIdSchema, optional: false, in: ['params'] },
    //       { fieldSchema: typeSchema, optional: false, in: ['body'] },
    //       { fieldSchema: issuerSchema, optional: false, in: ['body'] },
    //       { fieldSchema: cardNameSchema, optional: false, in: ['body'] },
    //       { fieldSchema: cardExpirySchema, optional: false, in: ['body'] },
    //     ]),
    //   );
    // case 'getUserCardByName':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: userIdSchema, optional: false, in: ['params'] },
    //       { fieldSchema: cardNameSchema, optional: false, in: ['params'] },
    //     ]),
    //   );
    // case 'updateUserCardByName':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: userIdSchema, optional: false, in: ['params'] },
    //       {
    //         fieldSchema: cardNameSchema,
    //         optional: false,
    //         in: ['params', 'body'],
    //       },
    //       { fieldSchema: typeSchema, optional: true, in: ['body'] },
    //       { fieldSchema: issuerSchema, optional: true, in: ['body'] },
    //       { fieldSchema: cardExpirySchema, optional: true, in: ['body'] },
    //     ]),
    //   );
    // case 'login':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: emailSchema, optional: false, in: ['body'] },
    //       { fieldSchema: passwordSchema, optional: false, in: ['body'] },
    //     ]),
    //   );
    // case 'deleteUserCardByName':
    //   return checkSchema(
    //     createSchema([
    //       { fieldSchema: userIdSchema, optional: false, in: ['params'] },
    //       { fieldSchema: cardNameSchema, optional: false, in: ['params'] },
    //     ]),
    //   );
    default:
      return [];
  }
}

export { getAllMerchants, validate, createMerchant };
