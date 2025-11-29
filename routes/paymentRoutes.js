
import express from 'express';
import * as paymentController from '../controllers/paymentController.js';

const router = express.Router();

router.get('/payments', paymentController.getAllPaymentsController);
router.get('/payments/details', paymentController.getAllPaymentsWithBookingController);
router.get('/payments/:id', paymentController.getPaymentByIdController);
router.post('/payments', paymentController.createPaymentController);
router.put('/payments/:id', paymentController.updatePaymentController);
router.delete('/payments/:id', paymentController.deletePaymentController);

export default router;
