/**
 * Mongoose Models for transaction
 *
 * @format
 */

import { Schema, model } from 'mongoose';

const TransactionModel = model(
  'Transaction',
  new Schema({
    _id: {
      type: String,
      required: [true, 'Id is required'],
    },
    user: {
      type: String,
      ref: 'User',
      required: [true, 'User is required'],
    },
    userCard: {
      type: String,
      required: [true, 'User card is required'],
    },
    merchant: {
      type: String,
      ref: 'Merchant',
      required: [true, 'Merchant is required'],
    },
    dateTime: {
      type: Number,
      required: [true, 'DateTime is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Transaction amount is required'],
    },
    cashBackAmount: {
      type: Number,
      required: [true, 'Transaction cashback amount is required'],
    },
    cashbackCategory: {
      type: String,
      required: [true, 'Transaction cashback category is required'],
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

export default TransactionModel;
