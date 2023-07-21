/**
 * Database methods for transaction management
 *
 * @format
 */

import ApplicationError from '../shared/errors/application/applicationError';
import DatabaseError from '../shared/errors/database/databaseError';
import TransactionExistsError from '../shared/errors/database/transaction/transactionExistsError';
import toApplicationError from '../shared/errors/errorHelpers';
import { Transaction } from '../shared/types';
import TransactionModel from './models/transactionModels';
import * as userDatabase from './userDatabase';
import * as merchantDatabase from './merchantDatabase';
import TransactionNotFoundError from '../shared/errors/database/transaction/transactionNotFoundError';

/**
 * Return all transactions in database
 * @returns All transactions in database
 */
async function getAlltransactions() {
  try {
    const transactions = await TransactionModel.find()
      .populate('user')
      .populate('merchant');
    return transactions;
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

/**
 * Create a new transaction and save to database
 * @param newTransaction transaction to create
 * @returns The created transaction, or throws an error if transaction already exists
 */
async function createTransaction(newTransaction: Transaction) {
  try {
    // Check if transaction already exists in database (using user + merchant + dateTime + amount as unique identifier)
    if (
      await TransactionModel.exists({
        user: newTransaction.user,
        merchant: newTransaction.merchant,
        dateTime: newTransaction.dateTime,
        amount: newTransaction.amount,
      })
    ) {
      throw new TransactionExistsError(
        `Transaction with user '${newTransaction.user}', merchant '${newTransaction.merchant}', dateTime '${newTransaction.dateTime}' & amount '${newTransaction.amount}' already exists.`,
      );
    }

    // Check if user, userCard & merchant exists in database
    await userDatabase.getUserById(newTransaction.user);
    await userDatabase.getUserCardByName(
      newTransaction.user,
      newTransaction.userCard,
    );
    await merchantDatabase.getMerchantById(newTransaction.merchant);

    const createdTransaction = await TransactionModel.create(newTransaction);
    return createdTransaction;
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

/**
 * Get a transaction by id
 * @param transactionId Id of transaction to get
 * @returns The transaction with the given id, or throws an error if transaction does not exist
 */
async function getTransactionById(transactionId: Transaction['_id']) {
  try {
    // Find transaction with matching id from database
    const transaction = await TransactionModel.findById(transactionId)
      .populate('user')
      .populate('merchant');

    // Check if transaction exists
    if (!transaction) {
      throw new TransactionNotFoundError(
        `Transaction with id '${transactionId}' not found.`,
      );
    }

    return transaction;
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

/**
 * Update a transaction in database
 * @param transactionId Id of transaction to update
 * @param updates Updates to apply to transaction
 * @returns The updated transaction, or throws an error if transaction does not exist
 */
async function updateTransactionById(
  transactionId: Transaction['_id'],
  updates: Partial<Transaction>,
) {
  try {
    // Find transaction with matching id from database
    const transaction = await TransactionModel.findById(transactionId);

    // Check if transaction exists
    if (!transaction) {
      throw new TransactionNotFoundError(
        `Transaction with id '${transactionId}' not found.`,
      );
    }

    const user = updates.user || transaction.user;
    const merchant = updates.merchant || transaction.merchant;
    const dateTime = updates.dateTime || transaction.dateTime;
    const amount = updates.amount || transaction.amount;

    // Check if updates would cause transaction to be a duplicate
    if (
      updates.user ||
      updates.merchant ||
      updates.dateTime ||
      updates.amount
    ) {
      if (
        await TransactionModel.exists({
          user,
          merchant,
          dateTime,
          amount,
        })
      ) {
        throw new TransactionExistsError(
          `Transaction with user '${user}', merchant '${merchant}', dateTime '${dateTime}' & amount '${amount}' already exists.`,
        );
      }
    }

    // Update transaction with new values
    transaction.set(updates);
    transaction.updatedAt = new Date().getTime();

    // Check if user, userCard & merchant exists in database
    await userDatabase.getUserById(transaction.user as string);
    await userDatabase.getUserCardByName(
      transaction.user as string,
      transaction.userCard as string,
    );
    await merchantDatabase.getMerchantById(transaction.merchant as string);

    // Save updated transaction to database
    const updatedtransaction = await transaction.save();
    return updatedtransaction;
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

/**
 * Delete a transaction from database
 * @param transactionId Id of transaction to delete
 */
async function deleteTransactionById(transactionId: Transaction['_id']) {
  try {
    // Delete transaction from database
    await TransactionModel.findByIdAndDelete(transactionId);
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

export {
  getAlltransactions,
  createTransaction,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
};
