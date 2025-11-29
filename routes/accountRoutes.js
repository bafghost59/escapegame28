import express from 'express';
import * as accountController from '../controllers/accountController.js';

const router = express.Router();

router.post('/accounts', accountController.createAccountController);
router.get('/accounts', accountController.getAllAccountsController);
router.get('/accounts/:id', accountController.getAccountByIdController);
router.put('/accounts/:id', accountController.updateAccountController);
router.delete('/accounts/:id', accountController.deleteAccountController);

export default router;