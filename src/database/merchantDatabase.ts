/**
 * Database methods for merchant management
 *
 * @format
 */

import ApplicationError from '../shared/errors/application/applicationError';
import DatabaseError from '../shared/errors/database/databaseError';
import MerchantExistsError from '../shared/errors/database/merchant/merchantExistsError';
import MerchantNotFoundError from '../shared/errors/database/merchant/merchantNotFoundError';
import toApplicationError from '../shared/errors/errorHelpers';
import { Merchant } from '../shared/types';
import MerchantModel from './models/merchantModels';
import TransactionModel from './models/transactionModels';

/**
 * Return all merchants in database
 * @returns All merchants in database
 */
async function getAllMerchants() {
  try {
    const merchants = await MerchantModel.find();
    return merchants;
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
 * Create a new merchant and save to database
 * @param newMerchant Merchant to create
 * @returns The created merchant, or throws an error if merchant already exists
 */
async function createMerchant(newMerchant: Merchant) {
  try {
    // Check if merchant already exists in database (using name + lat + long as unique identifier)
    const merchant = await MerchantModel.findOne({
      name: newMerchant.name,
      latitude: newMerchant.latitude,
      longitude: newMerchant.longitude,
    });

    // Check status of merchant
    if (merchant && merchant.status === 'active') {
      throw new MerchantExistsError(
        `Merchant with name '${newMerchant.name}' & latitude,longitude of '${newMerchant.latitude}/${newMerchant.longitude}' already exists.`,
      );
    } else if (merchant && merchant.status === 'inactive') {
      // If merchant exists but is inactive, update merchant to active
      merchant.status = 'active';
      merchant.updatedAt = new Date().getTime();

      // Save updated merchant to database
      const updatedMerchant = await merchant.save();
      return updatedMerchant;
    }

    const createdMerchant = await MerchantModel.create(newMerchant);
    return createdMerchant;
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
 * Get a merchant by id
 * @param merchantId Id of merchant to get
 * @returns The merchant with the given id, or throws an error if merchant does not exist
 */
async function getMerchantById(merchantId: Merchant['_id']) {
  try {
    // Find merchant with matching id from database
    const merchant = await MerchantModel.findById(merchantId);

    // Check if merchant exists
    if (!merchant) {
      throw new MerchantNotFoundError(
        `Merchant with id '${merchantId}' not found.`,
      );
    }

    return merchant;
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
 * Update a merchant in database
 * @param merchantId Id of merchant to update
 * @param updates Updates to apply to merchant
 * @returns The updated merchant, or throws an error if merchant does not exist
 */
async function updateMerchantById(
  merchantId: Merchant['_id'],
  updates: Partial<Merchant>,
) {
  try {
    // Find merchant with matching id from database
    const merchant = await MerchantModel.findById(merchantId);

    // Check if merchant exists
    if (!merchant) {
      throw new MerchantNotFoundError(
        `Merchant with id '${merchantId}' not found.`,
      );
    }

    // Check if updates would cause merchant to be a duplicate
    if (updates.name || updates.latitude || updates.longitude) {
      if (
        await MerchantModel.exists({
          name: updates.name || merchant.name,
          latitude: updates.latitude || merchant.latitude,
          longitude: updates.longitude || merchant.longitude,
        })
      ) {
        throw new MerchantExistsError(
          `Merchant with name '${
            updates.name || merchant.name
          }' and latitude/longitude '${updates.latitude || merchant.latitude},${
            updates.longitude || merchant.longitude
          }' already exists.`,
        );
      }
    }

    // Update merchant with new values
    merchant.set(updates);
    merchant.updatedAt = new Date().getTime();

    // Save updated merchant to database
    const updatedMerchant = await merchant.save();
    return updatedMerchant;
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
 * Delete a merchant from database
 * @param merchantId Id of merchant to delete
 */
async function deleteMerchantById(merchantId: Merchant['_id']) {
  try {
    // TODO: Implement validation that merchant is not in use by any transactions
    // Check if merchant is in use by any transactions
    if (await TransactionModel.exists({ merchant: merchantId })) {
      // Mark merchant as inactive
      await MerchantModel.findByIdAndUpdate(merchantId, {
        status: 'inactive',
        updatedAt: new Date().getTime(),
      });
      return;
    }

    // Delete merchant from database
    await MerchantModel.findByIdAndDelete(merchantId);
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
 * Return all active merchants in database
 * @returns All active merchants in database
 */
async function getAllActiveMerchants() {
  try {
    const merchants = await MerchantModel.find({
      status: 'active',
    });
    return merchants;
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
  getAllMerchants,
  createMerchant,
  getMerchantById,
  updateMerchantById,
  deleteMerchantById,
  getAllActiveMerchants,
};
