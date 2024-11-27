import { Request, Response } from 'express';
import { bookOrderService, bookStoreService } from './bookStore.service';

//create a book stroe in mongoDb
const createBookStore = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const result = await bookStoreService.createBookStoreDB(bookData);
    //send response
    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        message: 'Validation failed',
        success: false,
        error: error,
        stack: error.stack,
      });
    } else {
      res.status(500).json({
        message: 'Validation failed',
        success: false,
      });
    }
  }
};

//get the all book using Query
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm?.toString() || '';
    const result = await bookStoreService.getAllBooksFromDB(searchTerm);

    res.status(200).json({
      message: 'Books retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        message: 'Validation faild',
        status: false,
        error: error,
        stack: error.stack,
      });
    } else {
      res.status(404).json({
        message: 'Validation Failed',
        status: false,
      });
    }
  }
};

// get the specifick boook by ID
const getSpecificBooks = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await bookStoreService.getSpecificBooksFromDB(productId);
    if (!result) {
      res.status(404).json({
        message: 'Books not Found ',
        status: false,
        data: result,
      });
    }
    res.status(200).json({
      message: 'Book retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        message: 'Productd is not found',
        status: false,
        error: error,
        stack: error.stack,
      });
    } else {
      res.status(404).json({
        message: 'Validation Failed',
        status: false,
      });
    }
  }
};

//Delete book from MongoDb database
const deleteBooks = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await bookStoreService.deleteBooksFromDB(productId);
    res.status(200).json({
      message: 'Book deleted successfully',
      status: true,
      data: {},
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        message: 'Book deleted failed',
        status: false,
        error: error,
        stack: error.stack,
      });
    } else {
      res.status(404).json({
        message: 'Book deleted failed',
        status: false,
        error: error,
      });
    }
  }
};

//updated price and quantity in mongoDB database
const updatePriceAndQuantitye = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const result = await bookStoreService.updateBooksFromDB(
      productId,
      updatedData,
    );
    res.status(200).json({
      message: 'Book updated successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Book updated failed',
      status: false,
      error: error,
    });
  }
};

//create Order from book collection and using
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await bookOrderService.createOrderDB(orderData);
    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        message: 'Validation failed',
        success: false,
        error: error.message,
        stack: error.stack,
      });
    } else {
      res.status(404).json({
        message: 'Validation failed',
        success: false,
      });
    }
  }
};

// calculatePrice from the order
const calculatePrice = async (req: Request, res: Response) => {
  try {
    const result = await bookOrderService.calculateAllPrice();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue: result,
      },
    });
  } catch (error) {
    res.status(200).json({
      message: 'Error calculating revenue',
      status: false,
      error: error,
    });
  }
};

/// BookStre Controller
export const bookStoreController = {
  createBookStore,
  getAllBooks,
  getSpecificBooks,
  deleteBooks,
  updatePriceAndQuantitye,
};

// Order Controller
export const orderController = {
  createOrder,
  calculatePrice,
};
