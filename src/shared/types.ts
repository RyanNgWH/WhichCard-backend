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
    card: string;
  }[];
  createdAt: number;
  updatedAt: number;
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

export { User, Card };
