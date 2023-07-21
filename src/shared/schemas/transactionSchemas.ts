/**
 * Schemas for transaction routes validation
 *
 * @format
 */

import { FieldSchema } from './schemas';

const userIdSchema: FieldSchema = {
  name: 'user',
  options: {
    notEmpty: {
      errorMessage: 'User ID is required',
    },
    isUUID: {
      errorMessage: 'User ID must be a UUID',
    },
  },
};

const cardNameSchema: FieldSchema = {
  name: 'userCard',
  options: {
    notEmpty: {
      errorMessage: 'Card name is required',
    },
    isAlphanumeric: {
      // eslint-disable-next-line no-sparse-arrays
      options: [, { ignore: ' -' }],
      errorMessage: 'Card name must be alphanumeric, spaces and dashes allowed',
    },
    trim: true,
  },
};

const merchantIdSchema: FieldSchema = {
  name: 'merchant',
  options: {
    notEmpty: {
      errorMessage: 'Merchant ID is required',
    },
    isUUID: {
      errorMessage: 'Merchant ID must be a UUID',
    },
  },
};

const dateTimeSchema: FieldSchema = {
  name: 'dateTime',
  options: {
    notEmpty: {
      errorMessage: 'Transaction date and time is required',
    },
    isISO8601: {
      strict: true,
      errorMessage: 'Card expiry must be a valid date in YYYY-MM-DD format',
    },
    trim: true,
    toDate: true,
  },
};

const amountSchema: FieldSchema = {
  name: 'amount',
  options: {
    notEmpty: {
      errorMessage: 'Transaction amount is required',
    },
    isFloat: {
      errorMessage: 'Transaction amount must be a float',
    },
  },
};

const cashbackAmountSchema: FieldSchema = {
  name: 'cashbackAmount',
  options: {
    notEmpty: {
      errorMessage: 'Transaction cashback amount is required',
    },
    isFloat: {
      errorMessage: 'Transaction cashback amount must be a float',
    },
  },
};

const cashbackCategorySchema: FieldSchema = {
  name: 'cashbackCategory',
  options: {
    notEmpty: {
      errorMessage: 'Transaction cashback category is required',
    },
    isAlpha: {
      errorMessage: 'Transaction cashback category must be alphabetic',
    },
    toLowerCase: true,
    trim: true,
  },
};

const transactionIdSchema: FieldSchema = {
  name: 'transactionId',
  options: {
    notEmpty: {
      errorMessage: 'Transaction ID is required',
    },
    isUUID: {
      errorMessage: 'Transaction ID must be a UUID',
    },
  },
};

export {
  userIdSchema,
  merchantIdSchema,
  dateTimeSchema,
  amountSchema,
  cashbackAmountSchema,
  cashbackCategorySchema,
  cardNameSchema,
  transactionIdSchema,
};
