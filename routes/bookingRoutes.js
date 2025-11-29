import express from 'express';

import * as bookingController from '../controllers/bookingController.js';

const router = express.Router();

router.get('/bookings', bookingController.getAllBookingsController);
router.get('/bookings/details', bookingController.getAllBookingsWithDetailsController);
router.get('/bookings/:id', bookingController.getBookingByIdController);
router.post('/bookings', bookingController.createBookingController);
router.put('/bookings/:id', bookingController.updateBookingController);
router.delete('/bookings/:id', bookingController.deleteBookingController);

export default router;