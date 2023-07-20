/**
 * Database methods for transaction management
 *
 * @format
 */

import ApplicationError from '../shared/errors/application/applicationError';
import DatabaseError from '../shared/errors/database/databaseError';
import toApplicationError from '../shared/errors/errorHelpers';
import TransactionModel from './models/transactionModels';

/**
 * Return all transactions in database
 * @returns All transactions in database
 */
async function getAlltransactions() {
  try {
    const transactions = await TransactionModel.find();
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

// /**
//  * Create a new transaction and save to database
//  * @param newtransaction transaction to create
//  * @returns The created transaction, or throws an error if transaction already exists
//  */
// async function createtransaction(newtransaction: transaction) {
//   try {
//     // Check if transaction already exists in database (using name + lat + long as unique identifier)
//     const transaction = await transactionModel.findOne({
//       name: newtransaction.name,
//       latitude: newtransaction.latitude,
//       longitude: newtransaction.longitude,
//     });

//     // Check status of transaction
//     if (transaction && transaction.status === 'active') {
//       throw new transactionExistsError(
//         `transaction with name '${newtransaction.name}' & latitude,longitude of '${newtransaction.latitude}/${newtransaction.longitude}' already exists.`,
//       );
//     } else if (transaction && transaction.status === 'inactive') {
//       // If transaction exists but is inactive, update transaction to active
//       transaction.status = 'active';
//       transaction.updatedAt = new Date().getTime();

//       // Save updated transaction to database
//       const updatedtransaction = await transaction.save();
//       return updatedtransaction;
//     }

//     const createdtransaction = await transactionModel.create(newtransaction);
//     return createdtransaction;
//   } catch (error) {
//     if (!(error instanceof ApplicationError)) {
//       const appError = toApplicationError(error);
//       throw new DatabaseError(appError.message, appError.code);
//     } else {
//       throw error;
//     }
//   }
// }

// /**
//  * Get a transaction by id
//  * @param transactionId Id of transaction to get
//  * @returns The transaction with the given id, or throws an error if transaction does not exist
//  */
// async function gettransactionById(transactionId: transaction['_id']) {
//   try {
//     // Find transaction with matching id from database
//     const transaction = await transactionModel.findById(transactionId);

//     // Check if transaction exists
//     if (!transaction) {
//       throw new transactionNotFoundError(
//         `transaction with id '${transactionId}' not found.`,
//       );
//     }

//     return transaction;
//   } catch (error) {
//     if (!(error instanceof ApplicationError)) {
//       const appError = toApplicationError(error);
//       throw new DatabaseError(appError.message, appError.code);
//     } else {
//       throw error;
//     }
//   }
// }

// /**
//  * Update a transaction in database
//  * @param transactionId Id of transaction to update
//  * @param updates Updates to apply to transaction
//  * @returns The updated transaction, or throws an error if transaction does not exist
//  */
// async function updatetransactionById(
//   transactionId: transaction['_id'],
//   updates: Partial<transaction>,
// ) {
//   try {
//     // Find transaction with matching id from database
//     const transaction = await transactionModel.findById(transactionId);

//     // Check if transaction exists
//     if (!transaction) {
//       throw new transactionNotFoundError(
//         `transaction with id '${transactionId}' not found.`,
//       );
//     }

//     // Check if updates would cause transaction to be a duplicate
//     if (updates.name || updates.latitude || updates.longitude) {
//       if (
//         await transactionModel.exists({
//           name: updates.name || transaction.name,
//           latitude: updates.latitude || transaction.latitude,
//           longitude: updates.longitude || transaction.longitude,
//         })
//       ) {
//         throw new transactionExistsError(
//           `transaction with name '${
//             updates.name || transaction.name
//           }' and latitude/longitude '${updates.latitude || transaction.latitude},${
//             updates.longitude || transaction.longitude
//           }' already exists.`,
//         );
//       }
//     }

//     // Update transaction with new values
//     transaction.set(updates);
//     transaction.updatedAt = new Date().getTime();

//     // Save updated transaction to database
//     const updatedtransaction = await transaction.save();
//     return updatedtransaction;
//   } catch (error) {
//     if (!(error instanceof ApplicationError)) {
//       const appError = toApplicationError(error);
//       throw new DatabaseError(appError.message, appError.code);
//     } else {
//       throw error;
//     }
//   }
// }

// /**
//  * Delete a transaction from database
//  * @param transactionId Id of transaction to delete
//  */
// async function deletetransactionById(transactionId: transaction['_id']) {
//   try {
//     // TODO: Implement validation that transaction is not in use by any transactions
//     // // Get all users that have this transaction
//     // const users = await UserModel.find({ 'transactions.transaction': transactionId });

//     // // Remove transaction from each user
//     // users.forEach(async user => {
//     //   // eslint-disable-next-line no-param-reassign
//     //   user.transactions = user.transactions.filter(
//     //     transaction => transaction.transaction !== transactionId,
//     //   );
//     //   await user.save();
//     // });

//     // Delete transaction from database
//     await transactionModel.findByIdAndDelete(transactionId);
//   } catch (error) {
//     if (!(error instanceof ApplicationError)) {
//       const appError = toApplicationError(error);
//       throw new DatabaseError(appError.message, appError.code);
//     } else {
//       throw error;
//     }
//   }
// }

// /**
//  * Return all active transactions in database
//  * @returns All active transactions in database
//  */
// async function getAllActivetransactions() {
//   try {
//     const transactions = await transactionModel.find({
//       status: 'active',
//     });
//     return transactions;
//   } catch (error) {
//     if (!(error instanceof ApplicationError)) {
//       const appError = toApplicationError(error);
//       throw new DatabaseError(appError.message, appError.code);
//     } else {
//       throw error;
//     }
//   }
// }

export {
  getAlltransactions,
  // createtransaction,
  // gettransactionById,
  // updatetransactionById,
  // deletetransactionById,
};
