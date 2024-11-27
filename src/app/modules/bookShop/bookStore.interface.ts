import { ObjectId } from 'mongoose';

export type Book = {
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
};

export type Order = {
  email: string;
  product: ObjectId;
  quantity: number;
  totalPrice: number;
};
