export type RegisterForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type Contact = {
  id?: string;
  first: string;
  last: string;
  avatar: string;
  twitter?: string;
  createdAt?: string;
  updatedAt?: string;
};
