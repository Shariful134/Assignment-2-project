import { ObjectId } from 'mongoose';
import { Book, Order } from './bookStore.interface';
import { BookModel, OrderModel } from './bookStore.model';

//createBookStoreDB
const createBookStoreDB = async (bookStore: Book) => {
  const result = await BookModel.create(bookStore);
  return result;
};

// Get All Books using query from mongoDB
const getAllBooksFromDB = async (searchTerm: string) => {
  let filter = {};
  filter = {
    $or: [
      { title: { $regex: searchTerm } },
      { author: { $regex: searchTerm } },
      { category: { $regex: searchTerm } },
    ],
  };
  const result = await BookModel.find(filter);
  if (result.length === 0) throw new Error('Product is not found');
  return result;
};

// The details of a specific book by ID
const getSpecificBooksFromDB = async (_id: string) => {
  const result = await BookModel.findOne({ _id });
  return result;
};

//DeleteBookFrome MongoDb Databse
const deleteBooksFromDB = async (productId: string) => {
  const result = await BookModel.findByIdAndDelete(productId);
  return result;
};

//UpdatedBook From MongoDb books collection
const updateBooksFromDB = async (productId: string, updatedData: object) => {
  const updatedResult = await BookModel.findOneAndUpdate(
    { _id: productId },
    { $set: updatedData },
    { new: true },
  );
  return updatedResult;
};

// order managing in Databse and creataead a Order From MongoDb Database
const createOrderDB = async (bookOrderStore: Order) => {
  await updateData(bookOrderStore.product, bookOrderStore.quantity);
  const result = await OrderModel.create(bookOrderStore);
  return result;
};

//  Inventory Management Logic
const updateData = async (orderId: ObjectId, orderQuantity: number) => {
  const book = await BookModel.findById(orderId);
  if (!book) {
    throw new Error('product not found');
  }
  if (book.quantity < orderQuantity) {
    throw new Error('Insufficient stock');
  }
  book.quantity -= orderQuantity;
  if (book.quantity === 0) {
    book.inStock = false;
  }
  await book.save();
};

// calculate the all order price in database
const calculateAllPrice = async () => {
  const findRevenue = await OrderModel.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: 'product',
        foreignField: '_id',
        as: 'AllbookInfo',
      },
    },
    { $unwind: '$AllbookInfo' },
    {
      $project: {
        price: '$AllbookInfo.price',
        quantity: 1,
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ['$price', '$quantity'],
          },
        },
      },
    },
  ]);
  const totalRevenue = findRevenue.length > 0 ? findRevenue[0].totalRevenue : 0;
  return totalRevenue;
};

//bookstre service
export const bookStoreService = {
  createBookStoreDB,
  getAllBooksFromDB,
  getSpecificBooksFromDB,
  deleteBooksFromDB,
  updateBooksFromDB,
};

//bookOrderService
export const bookOrderService = {
  createOrderDB,
  calculateAllPrice,
};
