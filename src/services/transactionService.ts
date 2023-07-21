/**
 * Services (logic) for transaction management
 *
 * @format
 */

import { v4 as uuidv4 } from 'uuid';
import * as transactionDatabase from '../database/transactionDatabase';
import { Transaction } from '../shared/types';

/**
 * Get all transactions
 * @returns All transactions
 */
async function getAlltransactions() {
  const transactions = await transactionDatabase.getAlltransactions();
  return transactions;
}

/**
 * Create a new transaction
 * @param newTransaction transaction to create
 * @returns The created transaction, or throws an error if transaction already exists
 */
async function createTransaction(
  newTransaction: Pick<
    Transaction,
    | 'user'
    | 'userCard'
    | 'merchant'
    | 'dateTime'
    | 'amount'
    | 'cashbackAmount'
    | 'cashbackCategory'
  >,
) {
  // Create new transaction object with id and timestamps
  const transactionToAdd = {
    ...newTransaction,
    _id: uuidv4(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  // Pass new transaction to database to save transaction to database
  const createdTransaction = await transactionDatabase.createTransaction(
    transactionToAdd,
  );
  return createdTransaction;
}

/**
 * Get a transaction by id
 * @param transactionId Id of transaction to get
 * @returns The transaction with the given id, or throws an error if transaction does not exist
 */
async function getTransactionById(transactionId: Transaction['_id']) {
  const transaction = await transactionDatabase.getTransactionById(
    transactionId,
  );
  return transaction;
}

/**
 * Update a transaction by id
 * @param transactionId Id of transaction to update
 * @param updates Updates to apply to transaction
 * @returns The updated transaction, or throws an error if transaction does not exist
 */
async function updateTransactionById(
  transactionId: Transaction['_id'],
  updates: Partial<Transaction>,
) {
  const transaction = await transactionDatabase.updateTransactionById(
    transactionId,
    updates,
  );
  return transaction;
}

// /**
//  * Delete a transaction by id
//  * @param transactionId Id of transaction to delete
//  */
// async function deletetransactionById(transactionId: transaction['_id']) {
//   await transactionDatabase.deletetransactionById(transactionId);
// }

export {
  getAlltransactions,
  createTransaction,
  getTransactionById,
  updateTransactionById,
  // deletetransactionById,
};
