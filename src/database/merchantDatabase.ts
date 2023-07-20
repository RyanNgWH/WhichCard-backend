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
    if (
      await MerchantModel.exists({
        name: newMerchant.name,
        latitude: newMerchant.latitude,
        longitude: newMerchant.longitude,
      })
    ) {
      throw new MerchantExistsError(
        `Merchant with name '${newMerchant.name}' & latitude,longitude of '${newMerchant.latitude}/${newMerchant.longitude}' already exists.`,
      );
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
async function getMerchantById(merchantId: string) {
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
  merchantId: string,
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
    const updatedmerchant = await merchant.save();
    return updatedmerchant;
  } catch (error) {
    if (!(error instanceof ApplicationError)) {
      const appError = toApplicationError(error);
      throw new DatabaseError(appError.message, appError.code);
    } else {
      throw error;
    }
  }
}

export { getAllMerchants, createMerchant, getMerchantById, updateMerchantById };
