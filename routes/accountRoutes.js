import express from 'express';
import * as accountController from '../controllers/accountController.js';
import verifyToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/accounts', verifyToken, accountController.createAccountController);
router.get('/accounts', verifyToken, accountController.getAllAccountsController);
router.get('/accounts/:id', verifyToken, accountController.getAccountByIdController);
router.put('/accounts/:id', verifyToken, accountController.updateAccountController);
router.delete('/accounts/:id', verifyToken, accountController.deleteAccountController);

export default router;