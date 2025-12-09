
import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import verifyToken from '../middlewares/checkToken.js';

const router = express.Router();

router.get('/payments', verifyToken, paymentController.getAllPaymentsController);
router.get('/payments/details', verifyToken, paymentController.getAllPaymentsWithBookingController);
router.get('/payments/:id', verifyToken, paymentController.getPaymentByIdController);
router.post('/payments', verifyToken, paymentController.createPaymentController);
router.put('/payments/:id', verifyToken, paymentController.updatePaymentController);
router.delete('/payments/:id', verifyToken, paymentController.deletePaymentController);
router.post('/payments/stripe/checkout-session', verifyToken, paymentController.createStripeCheckoutSession);
router.post('/payments/validate-promo', verifyToken, paymentController.validatePromoController);

export default router;
