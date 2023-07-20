/**
 * Mongoose Models for Merchant
 *
 * @format
 */

import { Schema, model } from 'mongoose';

const MerchantModel = model(
  'Merchant',
  new Schema({
    _id: {
      type: String,
      required: [true, 'Id is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    prettyName: {
      type: String,
      required: [true, 'Pretty name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    MCC: {
      type: Number,
      required: [true, 'Address is required'],
    },
    createdAt: {
      type: Number,
      required: [true, 'Created at timestamp is required'],
    },
    updatedAt: {
      type: Number,
      required: [true, 'Updated at timestamp is required'],
    },
  }),
);

export default MerchantModel;
