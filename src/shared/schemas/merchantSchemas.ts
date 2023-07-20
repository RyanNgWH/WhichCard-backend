/**
 * Schemas for merchant routes validation
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
    trim: true,
  },
};

const prettyNameSchema: FieldSchema = {
  name: 'prettyName',
  options: {
    notEmpty: {
      errorMessage: 'Pretty Name is required',
    },
    trim: true,
  },
};

const addressSchema: FieldSchema = {
  name: 'address',
  options: {
    notEmpty: {
      errorMessage: 'Address is required',
    },
  },
};

const mccSchema: FieldSchema = {
  name: 'mcc',
  options: {
    notEmpty: {
      errorMessage: 'MCC is required',
    },
    isInt: {
      errorMessage: 'MCC must be an integer',
    },
  },
};

export { nameSchema, prettyNameSchema, addressSchema, mccSchema };
