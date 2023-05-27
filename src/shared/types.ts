/**
 * Shared types for the application
 *
 * @format
 */

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
};

type PostUser = {
  name: string;
  email: string;
  password: string;
};

export { User, PostUser };
