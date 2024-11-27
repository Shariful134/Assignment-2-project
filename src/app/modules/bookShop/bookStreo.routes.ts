import express from 'express';
import { bookStoreController, orderController } from './bookStore.controllers';
const router = express.Router();

// will call controller function All Routes
router.post('/products', bookStoreController.createBookStore);

router.get('/products', bookStoreController.getAllBooks);

router.get('/products/:productId', bookStoreController.getSpecificBooks);

router.delete('/products/:productId', bookStoreController.deleteBooks);

router.put('/products/:productId', bookStoreController.updatePriceAndQuantitye);

//Orderes Related Routes
router.post('/orders', orderController.createOrder);

router.get('/orders/revenue', orderController.calculatePrice);

export const bookRoutes = router;
