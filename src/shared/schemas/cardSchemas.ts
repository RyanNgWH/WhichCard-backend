/**
 * Schemas for card routes validation
 *
 * @format
 */

import { FieldSchema } from './schemas';

const typeSchema: FieldSchema = {
  name: 'type',
  options: {
    notEmpty: {
      errorMessage: 'Card type is required',
    },
    isAlphanumeric: {
      // eslint-disable-next-line no-sparse-arrays
      options: [, { ignore: ' ' }],
      errorMessage: 'Card type must be alphanumeric, spaces allowed',
    },
    toLowerCase: true,
    trim: true,
  },
};

const issuerSchema: FieldSchema = {
  name: 'issuer',
  options: {
    notEmpty: {
      errorMessage: 'Card issuer is required',
    },
    isAlpha: {
      errorMessage: 'Card issuer must be alphabetic',
    },
    toLowerCase: true,
    trim: true,
  },
};

const benefitsSchema: FieldSchema = {
  name: 'benefits',
  options: {
    isArray: {
      errorMessage: 'Benefits must be an array',
    },
    custom: {
      options: (value: any[]) => {
        // Check if array is empty
        if (value.length === 0) {
          return false;
        }

        // Check if each object in the array has the required fields
        return value.every(benefit => benefit.category && benefit.cashbackRate);
      },
      errorMessage:
        'Benefits must be an array of objects with category and cashback rate',
    },
  },
};

const benefitsCategorySchema: FieldSchema = {
  name: 'benefits.*.category',
  options: {
    notEmpty: {
      errorMessage: 'Benefits category is required',
    },
    isAlpha: {
      errorMessage: 'Benefits category must be alphabetic',
    },
    toLowerCase: true,
    trim: true,
  },
};

const benefitsMccsSchema: FieldSchema = {
  name: 'benefits.*.mccs',
  options: {
    isArray: {
      errorMessage: 'Benefits MCCs must be an array',
    },
    custom: {
      options: (value: any[]) => {
        // Check if array is empty
        if (value.length === 0) {
          return false;
        }

        // Check if each element in the array is a number
        return value.every(mcc => typeof mcc === 'number');
      },
      errorMessage: 'Benefits MCCs must be an array of mcc numbers',
    },
  },
};

const benefitsCashbackRateSchema: FieldSchema = {
  name: 'benefits.*.cashbackRate',
  options: {
    notEmpty: {
      errorMessage: 'Benefits cashback rate is required',
    },
    isFloat: {
      errorMessage: 'Benefits cashback rate must be a float',
    },
  },
};

const exclusionsSchema: FieldSchema = {
  name: 'exclusions',
  options: {
    isArray: {
      errorMessage: 'Exclusions must be an array',
    },
    custom: {
      options: (value: any[]) => {
        // Check if array is empty
        if (value.length === 0) {
          return false;
        }

        // Check if each element in the array is a number
        return value.every(mcc => typeof mcc === 'number');
      },
      errorMessage: 'Exclusions must be an array of mcc numbers',
    },
  },
};

const cashbackLimitSchema: FieldSchema = {
  name: 'cashbackLimit',
  options: {
    isFloat: {
      errorMessage: 'Cashback limit must be a float',
    },
  },
};

const minimumSpendSchema: FieldSchema = {
  name: 'minimumSpend',
  options: {
    isFloat: {
      errorMessage: 'Minimum spend must be a float',
    },
  },
};

const cardIdSchema: FieldSchema = {
  name: 'cardId',
  options: {
    notEmpty: {
      errorMessage: 'Card ID is required',
    },
    isUUID: {
      errorMessage: 'Card ID must be a UUID',
    },
  },
};

export {
  typeSchema,
  issuerSchema,
  benefitsSchema,
  benefitsCategorySchema,
  benefitsMccsSchema,
  benefitsCashbackRateSchema,
  exclusionsSchema,
  cashbackLimitSchema,
  minimumSpendSchema,
  cardIdSchema,
};
