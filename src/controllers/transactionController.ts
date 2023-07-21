/**
 * Controller methods for transaction management
 *
 * @format
 */

import { Request, Response } from 'express';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import * as transactionService from '../services/transactionService';
import toApplicationError from '../shared/errors/errorHelpers';
import { createSchema } from '../shared/schemas/schemas';
import {
  amountSchema,
  cardNameSchema,
  cashbackAmountSchema,
  cashbackCategorySchema,
  dateTimeSchema,
  merchantIdSchema,
  transactionIdSchema,
  userIdSchema,
} from '../shared/schemas/transactionSchemas';

/**
 * Get all transactions
 * @param req GET request for all transactions
 * @param res Status code 200 and all transactions in database
 */
async function getAlltransactions(req: Request, res: Response) {
  try {
    const alltransactions = await transactionService.getAlltransactions();
    res.send({ status: 'OK', data: alltransactions });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Create a new transaction
 * @param req POST request for new transaction
 * @param res Status code 201 and created transaction, 404 if user/merchant/user card not found or 422 if transaction already exists
 */
async function createTransaction(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract body from verified request
  const body = matchedData(req, { locations: ['body'] });

  // Create new transaction
  const newTransaction = {
    user: body.user,
    userCard: body.userCard,
    merchant: body.merchant,
    dateTime: body.dateTime,
    amount: body.amount,
    cashbackAmount: body.cashbackAmount,
    cashbackCategory: body.cashbackCategory,
  };

  try {
    // Pass new transaction to service to save transaction to database
    const createdTransaction = await transactionService.createTransaction(
      newTransaction,
    );
    res.status(201).send({ status: 'Created', data: createdTransaction });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Get a transaction by id
 * @param req GET request for transaction by id
 * @param res Status code 200 and transaction with given id or 404 if transaction does not exist
 */
async function getTransactionById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract transactionId from request parameters
  const { transactionId } = req.params;

  try {
    // Pass transactionId to service to get transaction from database
    const transaction = await transactionService.getTransactionById(
      transactionId,
    );
    res.send({ status: 'OK', data: transaction });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Update a transaction by id
 * @param req PATCH request for updating a transaction by id
 * @param res Status code 200 and updated transaction or error message if transaction could not be updated
 */
async function updateTransactionById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract transaction id and body from validated request parameters and body
  const { transactionId } = matchedData(req, { locations: ['params'] });
  const body = matchedData(req, { locations: ['body'] });

  try {
    // Pass transactionId and body to service to update transaction in database
    const updatedTransaction = await transactionService.updateTransactionById(
      transactionId,
      body,
    );
    res.send({ status: 'OK', data: updatedTransaction });
  } catch (error) {
    const appError = toApplicationError(error);
    res
      .status(appError.code)
      .send({ status: appError.status, data: { error: appError.message } });
  }
}

/**
 * Delete a transaction by id
 * @param req DELETE request for deleting a transaction by id
 * @param res Status code 200 and deleted transaction or error message if transaction could not be deleted
 */
async function deleteTransactionById(req: Request, res: Response) {
  // Check if validation errors exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: 'Bad Request', errors: errors.array() });
    return;
  }

  // Extract transaction id from validated request parameters
  const { transactionId } = matchedData(req, { locations: ['params'] });

  try {
    // Pass transactionId to service to delete transaction from database
    await transactionService.deleteTransactionById(transactionId);
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
    case 'createTransaction':
      return checkSchema(
        createSchema([
          { fieldSchema: userIdSchema, optional: false, in: ['body'] },
          { fieldSchema: cardNameSchema, optional: false, in: ['body'] },
          { fieldSchema: merchantIdSchema, optional: false, in: ['body'] },
          { fieldSchema: dateTimeSchema, optional: false, in: ['body'] },
          { fieldSchema: amountSchema, optional: false, in: ['body'] },
          { fieldSchema: cashbackAmountSchema, optional: false, in: ['body'] },
          {
            fieldSchema: cashbackCategorySchema,
            optional: false,
            in: ['body'],
          },
        ]),
      );
    case 'getTransactionById':
      return checkSchema(
        createSchema([
          { fieldSchema: transactionIdSchema, optional: false, in: ['params'] },
        ]),
      );
    case 'updateTransactionById':
      return checkSchema(
        createSchema([
          { fieldSchema: transactionIdSchema, optional: false, in: ['params'] },
          { fieldSchema: userIdSchema, optional: true, in: ['body'] },
          { fieldSchema: cardNameSchema, optional: true, in: ['body'] },
          { fieldSchema: merchantIdSchema, optional: true, in: ['body'] },
          { fieldSchema: dateTimeSchema, optional: true, in: ['body'] },
          { fieldSchema: amountSchema, optional: true, in: ['body'] },
          { fieldSchema: cashbackAmountSchema, optional: true, in: ['body'] },
          {
            fieldSchema: cashbackCategorySchema,
            optional: true,
            in: ['body'],
          },
        ]),
      );
    case 'deleteTransactionById':
      return checkSchema(
        createSchema([
          { fieldSchema: transactionIdSchema, optional: false, in: ['params'] },
        ]),
      );
    default:
      return [];
  }
}

export {
  getAlltransactions,
  validate,
  createTransaction,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
};
