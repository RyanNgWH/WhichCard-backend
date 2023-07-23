/**
 * Shared types for the application
 *
 * @format
 */

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  cards: {
    cardName: string;
    cardExpiry: Date;
    card: Card['_id'];
  }[];
  createdAt: number;
  updatedAt: number;
};

type UserCardRequest = {
  cardName: string;
  cardExpiry: Date;
  type: string;
  issuer: string;
};

type Card = {
  _id: string;
  type: string;
  issuer: string;
  benefits: {
    category: string;
    mccs: number[];
    cashbackRate: number;
  }[];
  exclusions: number[];
  cashbackLimit: number;
  minimumSpend: number;
  createdAt: number;
  updatedAt: number;
};

type Category = 'dining' | 'grocery' | 'petrol' | 'travel' | 'entertainment' | 'shopping' | 'transport' | 'telecommunications' | 'education' | 'electricity' | 'others';

type Merchant = {
  _id: string;
  name: string;
  prettyName: string;
  address: string;
  mcc: number;
  category: Category;
  longitude: number;
  latitude: number;
  createdAt: number;
  updatedAt: number;
  status: 'active' | 'inactive';
};

type Transaction = {
  _id: string;
  user: User['_id'];
  userCard: User['cards'][0]['card'];
  merchant: Merchant['_id'];
  dateTime: Date;
  amount: number;
  cashbackAmount: number;
  cashbackCategory: string;
  createdAt: number;
  updatedAt: number;
};

export { User, Card, UserCardRequest, Category, Merchant, Transaction };
