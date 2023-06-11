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
  createdAt: number;
  updatedAt: number;
};

export default User;
