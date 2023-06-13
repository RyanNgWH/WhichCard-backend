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

export {
  nameSchema,
  emailSchema,
  newPasswordSchema,
  passwordSchema,
  userIdSchema,
};
