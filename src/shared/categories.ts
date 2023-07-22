/**
 * Shared transaction categories for the application
 *
 * @format
 */

import { Category } from "./types";

const Dining = [5812, 5814, 5813, 5811, 5499];

const Grocery = [5411, 5422, 5441, 5451, 5462, 5499];

const Petrol = [5541, 5542];

const Travel = [3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007];

const Entertainment = [
  7832, 7932, 7991, 7993, 7994, 7995, 7996, 7997, 7998, 7999,
];

const Shopping = [
  5310, 5311, 5331, 5399, 5611, 5621, 5631, 5641, 5651, 5655, 5661, 5681, 5691,
  5697, 5698, 5699, 5931, 5932, 5933, 5935, 5937, 5940, 5941, 5942, 5943, 5944,
  5945, 5946, 5947, 5948, 5949, 5950, 5960, 5962, 5963, 5964, 5965, 5966, 5967,
  5968, 5969, 5970, 5971, 5972, 5973, 5975, 5976, 5977, 5978, 5983, 5992, 5993,
  5994, 5995, 5996, 5997, 5998, 5999,
];

const Transport = [4111, 4011, 4112, 4121, 4131];

const Telecommunications = [4812, 4813, 4814, 4815, 4816, 4821, 4829];

const Education = [8211, 8220, 8241, 8244, 8249, 8299];

const Electricity = [4900];

/**
 * Returns the category of a transaction based on its MCC.
 * @param mcc The MCC of the transaction.
 * @returns The category of the transaction.
 */
async function getCategory(mcc: number) : Promise<Category> {
  if (Dining.includes(mcc)) {
    return 'dining';
  }

  if (Grocery.includes(mcc)) {
    return 'grocery';
  }

  if (Petrol.includes(mcc)) {
    return 'petrol';
  }

  if (Travel.includes(mcc)) {
    return 'travel';
  }

  if (Entertainment.includes(mcc)) {
    return 'entertainment';
  }

  if (Shopping.includes(mcc)) {
    return 'shopping';
  }

  if (Transport.includes(mcc)) {
    return 'transport';
  }

  if (Telecommunications.includes(mcc)) {
    return 'telecommunications';
  }
  if (Education.includes(mcc)) {
    return 'education';
  }

  if (Electricity.includes(mcc)) {
    return 'electricity';
  }

  return 'others';
}

export default getCategory;
