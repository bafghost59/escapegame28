import express from 'express';

import * as bookingController from '../controllers/bookingController.js';
import verifyToken from '../middlewares/checkToken.js';

const router = express.Router();

router.get('/bookings/availability',bookingController.getAvailableSlotsController);
router.get('/bookings', verifyToken, bookingController.getAllBookingsController);
router.get('/bookings/details', bookingController.getAllBookingsWithDetailsController);
router.get('/bookings/:id', verifyToken, bookingController.getBookingByIdController);
router.get('/bookingsByAccountId/:id_account', bookingController.getAllBookingsByAccountIdController);
router.post('/addbooking', bookingController.createBookingController);
router.put('/bookings/:id', verifyToken, bookingController.updateBookingController);
router.delete('/bookings/:id', verifyToken, bookingController.deleteBookingController);
router.get('/cancellation-policies',bookingController.getCancellationPoliciesController);
router.get('/bookings/:id/cancellation-info',bookingController.getCancellationInfoForBookingController);

export default router;