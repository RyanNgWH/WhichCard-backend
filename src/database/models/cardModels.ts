/**
 * Mongoose Models for Card
 *
 * @format
 */

import { Schema, model } from 'mongoose';

const CardModel = model(
  'Card',
  new Schema({
    _id: {
      type: String,
      required: [true, 'Id is required'],
    },
    type: {
      type: String,
      required: [true, 'Card type is required'],
    },
    issuer: {
      type: String,
      required: [true, 'Card issuer is required'],
    },
    benefits: [
      {
        _id: false,
        category: String,
        mccs: [Number],
        cashbackRate: Number,
      },
    ],
    exclusions: [Number],
    cashbackLimit: Number,
    minimumSpend: Number,
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

export default CardModel;
