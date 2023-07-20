/**
 * Services (logic) for merchant management
 *
 * @format
 */

import { v4 as uuidv4 } from 'uuid';
import * as merchantDatabase from '../database/merchantDatabase';
import { Merchant } from '../shared/types';

/**
 * Get all merchants
 * @returns All merchants
 */
async function getAllMerchants() {
  const merchants = await merchantDatabase.getAllMerchants();
  return merchants;
}

/**
 * Create a new merchant
 * @param newMerchant merchant to create
 * @returns The created merchant, or throws an error if merchant already exists
 */
async function createMerchant(
  newMerchant: Pick<
    Merchant,
    'name' | 'prettyName' | 'address' | 'mcc' | 'longitude' | 'latitude'
  >,
) {
  // Create new merchant object with id and timestamps
  const merchantToAdd = {
    ...newMerchant,
    _id: uuidv4(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  // Pass new merchant to database to save merchant to database
  const createdMerchant = await merchantDatabase.createMerchant(merchantToAdd);
  return createdMerchant;
}

/**
 * Get a merchant by id
 * @param merchantId Id of merchant to get
 * @returns The merchant with the given id, or throws an error if merchant does not exist
 */
async function getMerchantById(merchantId: string) {
  const merchant = await merchantDatabase.getMerchantById(merchantId);
  return merchant;
}

export { getAllMerchants, createMerchant, getMerchantById };
