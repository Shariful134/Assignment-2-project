import { Schema, model } from 'mongoose';
import validator from 'validator';

import { Book, Order } from './bookStore.interface';

const bookStoreSchema = new Schema<Book>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: {
      type: Number,
      min: [0, 'Price must be a positive number'],
      required: true,
    },
    category: {
      type: String,
      enum: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const orderSchema = new Schema<Order>(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not validEmail',
      },
    },
    product: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

export const BookModel = model<Book>('Book', bookStoreSchema);
export const OrderModel = model<Order>('Order', orderSchema);
