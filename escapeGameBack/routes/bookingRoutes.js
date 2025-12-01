import express from 'express';

import * as bookingController from '../controllers/bookingController.js';
import verifyToken from '../middlewares/checkToken.js';

const router = express.Router();

router.get('/bookings', verifyToken, bookingController.getAllBookingsController);
router.get('/bookings/details', verifyToken, bookingController.getAllBookingsWithDetailsController);
router.get('/bookings/:id', verifyToken, bookingController.getBookingByIdController);
router.post('/bookings', verifyToken, bookingController.createBookingController);
router.put('/bookings/:id', verifyToken, bookingController.updateBookingController);
router.delete('/bookings/:id', verifyToken, bookingController.deleteBookingController);

export default router;