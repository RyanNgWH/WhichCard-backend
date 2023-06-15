/**
 * Mongoose Models for User
 *
 * @format
 */

import { Schema, model } from 'mongoose';

const UserModel = model(
  'User',
  new Schema({
    _id: {
      type: String,
      required: [true, 'Id is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    cards: [
      {
        _id: false,
        cardName: String,
        cardExpiry: Date,
        card: {
          type: String,
          ref: 'Card',
        },
      },
    ],
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

export default UserModel;
