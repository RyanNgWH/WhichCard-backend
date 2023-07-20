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
    toLowerCase: true,
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

const longitudeSchema: FieldSchema = {
  name: 'longitude',
  options: {
    notEmpty: {
      errorMessage: 'Longitude is required',
    },
    isFloat: {
      errorMessage: 'Longitude must be a float',
    },
  },
};

const latitudeSchema: FieldSchema = {
  name: 'latitude',
  options: {
    notEmpty: {
      errorMessage: 'Latitude is required',
    },
    isFloat: {
      errorMessage: 'Latitude must be a float',
    },
  },
};

const merchantIdSchema: FieldSchema = {
  name: 'merchantId',
  options: {
    notEmpty: {
      errorMessage: 'merchantId is required',
    },
    isUUID: {
      errorMessage: 'merchantId must be a UUID',
    },
  },
};

export {
  nameSchema,
  prettyNameSchema,
  addressSchema,
  mccSchema,
  longitudeSchema,
  latitudeSchema,
  merchantIdSchema,
};
