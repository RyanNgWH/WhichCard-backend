/**
 * Schemas for user routes validation
 *
 * @format
 */

import { FieldSchema } from './schemas';

const nameSchema: FieldSchema = {
  name: 'name',
  options: {
    notEmpty: {
      errorMessage: 'Name is required',
    },
    isAlphanumeric: {
      // eslint-disable-next-line no-sparse-arrays
      options: [, { ignore: ' -' }],
      errorMessage: 'Name must be alphanumeric, spaces and dashes allowed',
    },
    trim: true,
  },
};

const emailSchema: FieldSchema = {
  name: 'email',
  options: {
    notEmpty: {
      errorMessage: 'Email is required',
    },
    isEmail: {
      errorMessage: 'Email is invalid',
    },
    normalizeEmail: true,
  },
};

const newPasswordSchema: FieldSchema = {
  name: 'password',
  options: {
    notEmpty: {
      errorMessage: 'Password is required',
    },
    isStrongPassword: {
      errorMessage: 'Password does not meet requirements',
    },
  },
};

const passwordSchema: FieldSchema = {
  name: 'password',
  options: {
    notEmpty: {
      errorMessage: 'Password is required',
    },
  },
};

const userIdSchema: FieldSchema = {
  name: 'userId',
  options: {
    notEmpty: {
      errorMessage: 'userId is required',
    },
    isUUID: {
      errorMessage: 'userId must be a UUID',
    },
  },
};

const cardsArraySchema: FieldSchema = {
  name: 'cards',
  options: {
    isArray: {
      errorMessage: 'Cards must be an array',
    },
    custom: {
      options: (value: any[]) => {
        // Check if array is empty
        if (value.length === 0) {
          return false;
        }

        // Check if each object in the array has the required fields
        return value.every(
          card => card.cardName && card.cardExpiry && card.cardId,
        );
      },
      errorMessage:
        'Cards must be an array of objects with cardName, cardExpiry and cardId',
    },
  },
};

const cardArrayNameScema: FieldSchema = {
  name: 'cards.*.cardName',
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

const cardArrayExpirySchema: FieldSchema = {
  name: 'cards.*.cardExpiry',
  options: {
    notEmpty: {
      errorMessage: 'Card expiry is required',
    },
    isISO8601: {
      strict: true,
      errorMessage: 'Card expiry must be a valid date in YYYY-MM-DD format',
    },
    trim: true,
    toDate: true,
  },
};

const cardArrayIdSchema: FieldSchema = {
  name: 'cards.*.cardId',
  options: {
    notEmpty: {
      errorMessage: 'Card ID is required',
    },
    isUUID: {
      errorMessage: 'Card ID must be a UUID',
    },
  },
};

const cardNameSchema: FieldSchema = {
  name: 'cardName',
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

const cardExpirySchema: FieldSchema = {
  name: 'cardExpiry',
  options: {
    notEmpty: {
      errorMessage: 'Card expiry is required',
    },
    isISO8601: {
      strict: true,
      errorMessage: 'Card expiry must be a valid date in YYYY-MM-DD format',
    },
    trim: true,
    toDate: true,
  },
};

export {
  nameSchema,
  emailSchema,
  newPasswordSchema,
  passwordSchema,
  userIdSchema,
  cardsArraySchema,
  cardArrayNameScema,
  cardArrayExpirySchema,
  cardArrayIdSchema,
  cardNameSchema,
  cardExpirySchema,
};
